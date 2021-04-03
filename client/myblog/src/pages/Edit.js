import { useState, useEffect } from "react";
const Edit = () => {
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        
    }
	return (
		<>
			<form>
				<input
					name="author"
					placeholder="Author's name"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
				<input
					name="title"
					placeholder="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button type="submit" onClick={handlSubmit}>Submit</button>
			</form>
		</>
	);
};

export default Edit;
