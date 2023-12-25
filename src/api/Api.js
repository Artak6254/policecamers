

export const headerData = async () => {
  try {
    const response = await fetch("http://10.111.111.212:8801/header",{
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
        const response = await fetch("http://10.111.111.212:8801/camera",{
          cache:"no-cache"
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const person = async (id) => {
  try {
      const response = await fetch(`http://10.111.111.212:8801/camera/${id}`,{
        cache:"no-cache"
      })
      const data = await response.json()
      return data
  } catch (error) {
      console.log(error.message);
  }
}

export const exel = async () => {
  try {
    const response = await fetch("http://10.111.111.212:8801/renderexel",{
      cache:"no-cache"
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error.message);
  }
}