import './App.css';
import JSONDATA from './MOCK_DATA.json'
import {useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

function App() {

  const FILTER = [
        {id:0,val:"İsim Kopyala"},
        {id:1,val:"Soyisim Kopyala"},
        {id:2,val:"Mail Kopyala"},
        {id:3,val:"Ip_Adres Kopyala"}
    ]
  const SEARCH = [
        {id:0,val:"İsim"},
        {id:1,val:"Soyisim"},
        {id:2,val:"Mail"},
        {id:3,val:"Ip_Adres"}
    ]

  const [searchValue,setSearchValue] = useState('');
  const [copyText,setCopyText] = useState('');

  const [copy, setCopy] = useState(0);
  const [filterActive,setFilterActive] = useState(0);
  const [searchActive,setSearchActive] = useState(0);
  const filterBtnFun = (item) => {
      setCopy(item.id);
      setFilterActive(item.id);
  }



  const searchBtnFun = (item) => {
        setSearchActive(item.id);
        console.log(searchActive);
  }

  const handleCopyText = (item) => {
      if(copy === 0) { setCopyText(item.first_name)}
      if(copy === 1) { setCopyText(item.last_name)}
      if(copy === 2) { setCopyText(item.email)}
      if(copy === 3) { setCopyText(item.ip_address)}
  }

  return (
    <div className="filter">
        {copyText && <div className="filter-copy-text">{copyText} Copied !!!</div>}
        <div className="filter-title">ARAMA YAPMAK İSTEDİĞİNİZ FİLTREYİ SEÇİNİZ.</div>
        <div className="filter-list">
            {SEARCH.map((item,key) => {
                return <button key={key} className={`filter-item ${item.id === searchActive ? 'active' : ''}`} onClick={() => searchBtnFun(item)}>{item.val}</button>
            })}
        </div>
      <input placeholder="Bir şeyler Ara..." type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value.toLowerCase())}/>
        <div className="filter-list">
            {FILTER.map((item,key) => {
                return <button key={key} className={`filter-item ${item.id === filterActive ? 'active' : ''}`} onClick={() => filterBtnFun(item)}>{item.val}</button>
            })}
        </div>
       <div className="filter-result">
           {/* eslint-disable-next-line array-callback-return */}
           {JSONDATA.filter(val => {

               if(searchValue === "") {return val}
               else if (searchActive === 0 && val.first_name.toLowerCase().includes(searchValue)) {return val}
               else if (searchActive === 1 && val.last_name.toLowerCase().includes(searchValue)) {return val}
               else if (searchActive === 2 && val.email.toLowerCase().includes(searchValue)) {return val}
               else if (searchActive === 3 && val.ip_address.toLowerCase().includes(searchValue)) {return val}

           }).map((val,key) => {
                  return <CopyToClipboard key={key} text={
                      copy === 0 ? val.first_name :
                          copy === 1 ? val.last_name :
                              copy === 2 ? val.email :
                                  copy === 3 ? val.ip_address :
                                      ''
                  }
                  >
                      <ul onClick={() => handleCopyText(val)} className="filter-result-item">
                          <li>{val.first_name} {val.last_name} </li>
                          <li>{val.email} </li>
                          <li>{val.ip_address} </li>
                      </ul>
                  </CopyToClipboard>

           })}
       </div>

    </div>
  );
}

export default App;
