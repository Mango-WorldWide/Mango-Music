import AlbumForm from "../AlbumForm"
const CreateAlbum = () => {
    const input = {
        title: 'hi'
    }
    return (
        <AlbumForm input={input} formType="Create a new Album"/>
    )
}
export default CreateAlbum
