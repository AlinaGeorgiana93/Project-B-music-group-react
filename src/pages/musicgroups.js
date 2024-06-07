import React, {useState, useEffect} from 'react'
import musicService from '../services/music-group-service';
import {MusicNoteList} from 'react-bootstrap-icons';
import {Link } from "react-router-dom";

export function Musicgroups(props) {

  const [groups, setGroups] = React.useState({});
  const [filter, setFilter] = useState(props.searchFilter || "");
  const [pageNr, setPageNr] = useState(0);
  const [pageMax, setPageMax] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  
  
  useEffect(() => {
  
  (async () => {

      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      const a = await service.readMusicGroupsAsync(0, false, props.searchFilter);
      setGroups(a);
      setPageMax(a.pageCount);
      setTotalCount(a.dbItemsCount);
      console.log(setTotalCount);
      console.log (setPageMax);
      

    })();

    setFilter(props.searchFilter);   
  }, [props])
  

  const onSearch = async (e) => {
    e.preventDefault();  //In case the button is of type submit (default for a button inside a form)

    const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
    const _serviceData = await service.readMusicGroupsAsync(0, false, e.searchFilter);

    setGroups(_serviceData);
    setFilter(e.searchFilter);
    setPageMax(_serviceData.pageCount);
    setTotalCount(_serviceData.dbItemsCount);
    
  }

  const onPrevClick = async (e) => {
    if (pageNr > 0) {
      //own pager activity
      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      const _serviceData = await service.readMusicGroupsAsync(pageNr - 1, false, filter);

      setPageNr (pageNr - 1);
      setGroups(_serviceData);
      setTotalCount(_serviceData.dbItemsCount);
    }
  }
  const onNextClick = async (e) => {

      if (pageNr < pageMax-1) {
        //own pager activity
        const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
        const _serviceData = await service.readMusicGroupsAsync(pageNr + 1, false, filter);
        
        setPageNr(pageNr + 1);
        setGroups(_serviceData);
        setTotalCount(_serviceData.dbItemsCount);
        }
  }


  return (
    <div className="container px-4 py-4" id="list-of-items">
      <h2 className="groups">
        <MusicNoteList className="bi bi-music-note-list flex-shrink-0 me-3" width="1.75em" height="1.75em" />
        List of Groups
      </h2>

      <p className='famous'>Below are some of the world's most famous Groups.</p>
      
     
      <ListSearch searchFilter={filter} onSearch={onSearch} />
      <div className="total">Total number of music groups: {totalCount}</div> 
      <List groups={groups} />
      <ListPager onPrevClick={onPrevClick} onNextClick={onNextClick} />
    </div>
  );
}



export function ListSearch(props) {

    const onClick = (e) => {
      e.preventDefault(); 
      
       e.searchFilter =  document.getElementById("search").value;
       if (props.onSearch) props.onSearch(e);
    }

  return (
    <div className="row mb-1 text-center">
    <div className="col-md-8 ">
      <form className="d-flex mt-3 mt-lg-0" role="search">
        <input id='search' className="form-control me-2" type="search" placeholder="Search" 
          defaultValue = {props.searchFilter} aria-label="Search"/>
        <button className="btn btn-outline-secondary" onClick={onClick}>Search</button>
      </form>
    </div>
  </div>
  )
}

export function ListPager(props) {

  const onPrevClick = (e) => {
    //own pager activity

    //Lift event
    if (props.onPrevClick) props.onPrevClick(e);
  }
  const onNextClick = (e) => {
        //own pager activity
            //Lift event
    if (props.onNextClick) props.onNextClick(e);
  }
  return (
    <nav aria-label="Standard pagination example">
      <ul className="pagination">
      <li className="page-item">
          <button className="page-link" onClick={onPrevClick}>&laquo;</button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={onNextClick}>&raquo;</button>
        </li>
      </ul>
    </nav>
  )
}

export function List(props) {
  return (
    <div className="row row-cols-1 row-cols-lg-6 align-items-stretch g-4 py-5">
      <div className="col-md-7 col-lg-10">
        <div className="row mb-2 text-center">
          <div className="col-md-3 themed-grid-head-col">Name</div>
          <div className="col-md-2 themed-grid-head-col">Established Year</div>
          <div className="col-md-2 themed-grid-head-col">Genre</div>
          <div className="col-md-2 themed-grid-head-col">Number of Albums</div>
          <div className="col-md-2 themed-grid-head-col">Number of Artists</div>
        </div>
        {props.groups?.pageItems?.map((b) => (
          <Link to={`/groupview/${b.musicGroupId}`} style={{ textDecoration: 'none' }} key={b.musicGroupId}>
            <div className="row mb-2 text-center">
              <div className="col-md-3 themed-grid-col">{b.name}</div>
              <div className="col-md-2 themed-grid-col">{b.establishedYear}</div>
              <div className="col-md-2 themed-grid-col">{b.strGenre}</div>
              <div className="col-md-2 themed-grid-col">{b.albums?.length || 0}</div>
              <div className="col-md-2 themed-grid-col">{b.artists?.length || 0}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}