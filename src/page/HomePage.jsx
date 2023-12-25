import { useState, useEffect } from "react"
import Header from "../component/Header"
import RARegions from "../component/RARegions"
import Footer from "../component/Footer"
import { headerData } from "../api/Api"
import { regions } from "../api/Api"



const HomePage = () => {
    const [headData, setHeadData] = useState([]);
    const [region, setRegion] = useState([]);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
      headerData().then((res) => setHeadData(res));
      regions().then((res) => setRegion(res));
    }, []);




    const filteredRegions = region.filter((el) =>
      el.title.toLowerCase().includes(searchText.toLowerCase())
    );
    
  return (
    <div>
    <Header headData={headData} searchText={searchText} setSearchText={setSearchText} region={region}/>
    <RARegions filteredRegions={filteredRegions} />
    <Footer />
  </div>
  )
}

export default HomePage