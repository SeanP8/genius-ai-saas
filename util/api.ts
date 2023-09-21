export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
  }

  export const createNewEntry = async(req: any) => {
    const mesa = await req;

    const {messages} = mesa;
    const content = messages;
    
    

    // const {messages} = body;

    const res = await fetch(
        new Request(absoluteUrl('/api/conversation'),{
            method: 'POST',
            headers: [
              ["Content-Type", "application/json"]],
            body: JSON.stringify({content})
        })
    )

    if(res.ok){
        const data = await res.json()
        return data.data
    }

    
  }