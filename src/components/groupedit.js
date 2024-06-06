import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import musicService from '../services/music-group-service';

function GroupsDetailsEdit(props) {
  const params = useParams();
  const [group, setGroup] = useState({});
  const [editedGroup, setEditedGroup] = useState({
    name: '',
    establishedYear: '',
    strGenre: ''
  });

  useEffect(() => {
    (async () => {
      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      const groupData = await service.readMusicGroupAsync(params.id);
      setGroup(groupData);
      setEditedGroup(groupData);
    })();
  }, [params.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedGroup({ ...editedGroup, [id]: value });
  };

  const handleSave = async () => {
    const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
    await service.updateMusicGroupAsync(params.id, editedGroup);
    // Optionally, you can navigate the user to the group view page after saving
  };

  return (
    <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
      <div className="col-md-7 col-lg-8">
        <form className="needs-validation">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="musicGroupId" className="form-label">Group Id</label>
              <input type="text" className="form-control" id="musicGroupId" value={editedGroup?.musicGroupId} readOnly />
            </div>
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">Group</label>
              <input type="text" className="form-control" id="name" value={editedGroup?.name} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <label htmlFor="establishedYear" className="form-label">Established Year</label>
              <input type="text" className="form-control" id="establishedYear" value={editedGroup?.establishedYear} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <label htmlFor="strGenre" className="form-label">Genre</label>
              <input type="text" className="form-control" id="strGenre" value={editedGroup?.strGenre} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
            <label htmlFor="numberartists" className="form-label">Number Artists</label>
            <input type="text" className="form-control" id="numberartists" value={editedGroup?.artists?.length || ''} onChange={handleChange} />
          </div>
          <div className="col-sm-6">
            <label htmlFor="numberalbums" className="form-label">Number Published Albums</label>
            <input type="text" className="form-control" id="numberalbums" value={editedGroup?.albums?.length || ''} onChange={handleChange} />
          </div>
          </div>
        </form>
        <div className="mt-3">
          <button className="custom-btn" onClick={handleSave}>Save Changes</button>
          <Link to={`/groupview/${group?.musicGroupId}`} className="custom-btn ms-2">Cancel</Link>
        </div>
      </div>
    </div>
  );
}

export default GroupsDetailsEdit;