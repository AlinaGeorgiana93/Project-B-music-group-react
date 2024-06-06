import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {Link } from "react-router-dom";

import musicService from '../services/music-group-service'

export function GroupView() {

  const params = useParams();
  const [group, setGroups] = useState({});

  useEffect(() => {

    (async () => {

        const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
        const a = await service.readMusicGroupAsync (params.id)

        setGroups(a)
    })();

  }, [params.id])
  console.log(group);

  return (
    <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
      <div className="col-md-7 col-lg-8">
        <form className="needs-validation">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="musicGroupId" className="form-label">Group Id</label>
              <input type="text" className="form-control" id="musicGroupId" value={group?.musicGroupId} readOnly />
            </div>
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">Group</label>
              <input type="text" className="form-control" id="name" value={group?.name} readOnly />
            </div>
            <div className="col-sm-6">
              <label htmlFor="establishedYear" className="form-label">Established Year</label>
              <input type="text" className="form-control" id="establishedYear" value={group?.establishedYear} readOnly />
            </div>
            <div className="col-sm-6">
              <label htmlFor="strGenre" className="form-label">Genre</label>
              <input type="text" className="form-control" id="strGenre" value={group?.strGenre} readOnly />
            </div>
            <div className="col-sm-6">
            <label htmlFor="numberartists" className="form-label">Number Artists</label>
            <input type="text" className="form-control" id="numberartists" value={group?.artist?.length || ''} readOnly />
          </div>
          <div className="col-sm-6">
            <label htmlFor="numberalbums" className="form-label">Number published albums</label>
            <input type="text" className="form-control" id="numberalbums" value={group?.album?.length || ''} readOnly />
          </div>
          </div>
        </form>
        <div className="mt-3">
          <Link to={`/groupedit/${group?.musicGroupId}`} className="custom-btn">
            Edit Group
          </Link>
        </div>
      </div>
    </div>
  );
}