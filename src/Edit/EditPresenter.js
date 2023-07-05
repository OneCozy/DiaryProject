import DiaryEditor from '../components/DiaryEditor';


const EditPresenter = ({ originData, onEdit, onRemove }) => {
    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} onEdit={onEdit} onRemove={onRemove} />}
        </div>
    );
}

export default EditPresenter;