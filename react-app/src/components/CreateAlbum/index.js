import AlbumForm from "../AlbumForm"
const CreateAlbum = () => {
    const input = {
        title: '',
        description: '',
        cover: '',
        genre:'',
        year:''

    }
    return (
        <AlbumForm input={input} formType="Create"/>
    )
}
export default CreateAlbum
