import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import musicService from '../services/music-group-service';

function GroupsDetailsEdit(props) {
  const params = useParams();
  const [group, setGroup] = useState({});
  const [editedGroup, setEditedGroup] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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
    console.log(`Changing ${id} to ${value}`);
    setEditedGroup({ ...editedGroup, [id]: value });
  };

  const handleSave = async () => {
    try {
      const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
      await service.updateMusicGroupAsync(params.id, editedGroup);
      setSuccessMessage('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
      <div className="col-md-7 col-lg-8">
        <form className="needs-validation">
          <div className="row g-3">
           
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">Group</label>
              <input type="text" className="form-control" id="name" value={editedGroup?.name} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <label htmlFor="establishedYear" className="form-label">Established Year</label>
              <input type="text" className="form-control" id="establishedYear" value={editedGroup?.establishedYear} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <label htmlFor="genre" className="form-label">Group Genre</label>
              <select className="form-control" id="genre" value={editedGroup?.genre || ''} onChange={handleChange}>
                <option value="0">Rock</option>
                <option value="1">Blues</option>
                <option value="2">Jazz</option>
                <option value="3">Metall</option>
              </select>
            </div>
          </div>
        </form>
        <div className="mt-3">
          <button className="custom-btn" onClick={handleSave}>Save Changes</button>
          <Link to={`/groupview/${group?.musicGroupId}`} className="custom-btn ms-2">Cancel</Link>
        </div>
        {successMessage && <p className="text-success">{successMessage}</p>}
      </div>
    </div>
  );
}
// strGenre can't be edit because is not in update (swagger), but Genre (Group -Genre named by me) can change strGenre by group. '
// for correct genre , we should know groupGenre numbers so, that's why i made a option to choose one of them.
// 0- rock; 1-blues; 2- jazz; 3-metall.

export default GroupsDetailsEdit;