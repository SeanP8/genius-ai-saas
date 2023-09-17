import { absoluteUrl } from "@/util/api";
import prismadb from "@/util/prismadb";
import { stripe } from "@/util/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settingsUrl = absoluteUrl('/settings');

export async function GET(){
    try {
        const {userId} = auth();
        const user = currentUser();

        if(!userId || !user){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {userId}
        })

        if(userSubscription && userSubscription.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            })

            return new NextResponse(JSON.stringify({url: stripeSession.url}))
        }


        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            // from cler
            
            // customer_email: user.emailAddress[0].emailAddress,
            line_items: [
              {
                price_data: {
                  currency: "USD",
                  product_data: {
                    name: "Genius Pro",
                    description: "Unlimited AI Generations"
                  },
                  
                  unit_amount: 2000, // $20
                  recurring: {
                    interval: "month"
                  }
                },
                quantity: 1,
              },
            ],
            // our webhook will use this to see who is subscribed 
            metadata: {
              userId,
            },
          })

          return new NextResponse(JSON.stringify({url: stripeSession.url}))
    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}