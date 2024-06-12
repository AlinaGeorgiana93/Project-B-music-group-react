import React, { useEffect, useState } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import musicService from '../services/music-group-service';

function GroupsDetailsEdit(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState({});
  const [editedGroup, setEditedGroup] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      const groupData = await service.readMusicGroupAsync(params.id);
      setGroup(groupData);
      setEditedGroup({ ...groupData });
    })();
  }, [params.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'establishedYear') {
      const year = parseInt(value, 10);
      if (!isNaN(year) && year >= 1910 && year <= 2024) {
        setErrorMessage('');
      } else {
        setErrorMessage('Established Year must be between 1910 and 2024.');
      }
    }

    setEditedGroup({ ...editedGroup, [id]: value });
  };

  const handleSave = async () => {
    if (editedGroup.establishedYear < 1910 || editedGroup.establishedYear > 2024) {
      setErrorMessage('Established Year must be between 1910 and 2024.'); 
      return;
    }
    
    try {
      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      await service.updateMusicGroupAsync(params.id, editedGroup);
      setSuccessMessage('Changes saved successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving changes:', error);
      setErrorMessage('Error saving changes. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate(`/groupview/${group?.musicGroupId}`);
  };

  return (
    <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
      <div className="col-md-7 col-lg-8">
        <form className="needs-validation">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="musicGroupId" className="form-label">Group Id</label>
              <input type="text" className="form-control" id="musicGroupId" value={group.musicGroupId} readOnly />
            </div>
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">Group</label>
              <input type="text" className="form-control" id="name" value={editedGroup?.name} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <label htmlFor="establishedYear" className="form-label">Established Year</label>
              <input type="number" className="form-control" id="establishedYear" value={editedGroup?.establishedYear} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <label htmlFor="genre" className="form-label">Group Genre</label>
              <select className="form-control" id="genre" value={editedGroup?.genre || ''} onChange={handleChange}>
                <option value="0">Rock</option>
                <option value="1">Blues</option>
                <option value="2">Jazz</option>
                <option value="3">Metal</option>
              </select>
            </div>
          </div>
        </form>
        <div className="mt-3">
          <button className="custom-btn" onClick={handleSave}>Save Changes</button>
          <button className="custom-btn ms-2" onClick={handleCancel}>Cancel</button>
        </div>
        {successMessage && <p className="text-success">{successMessage}</p>}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default GroupsDetailsEdit;
