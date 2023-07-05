import DiaryEditor from '../components/DiaryEditor';


const EditPresenter = ({ originData, onEdit }) => {
    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} onEdit={onEdit} />}
        </div>
    );
}

export default EditPresenter;