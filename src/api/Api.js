

export const headerData = async () => {
  try {
    const response = await fetch("http://localhost:8801/header",{
      cache:"no-cache"
    })
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error.message);
  }
}


export const regions = async () => {
    try {
        const response = await fetch("http://localhost:8801/camera",{
          cache:"no-cache"
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}


