export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
  }

  const createURL = (path) => {
    return window.location.origin + path
}

  export const createNewEntry = async(content: any) => {
    console.log('util api ',content)
    const res = await fetch(
        new Request(absoluteUrl('/api/conversation'),{
            method: 'POST',
            body: JSON.stringify({content})
        })
    )
    if(res.ok){
        const data = await res.json()
        return data.data
    }
  }