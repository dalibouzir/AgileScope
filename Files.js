

// Get a reference to the file storage
const storage = firebase.storage().ref();

// Get a reference to the file database
const database = firebase.database().ref("Uploader");

// Set up the file upload listener
document.getElementById("file-upload-form").addEventListener("submit", function(e) {
	e.preventDefault();
	
	// Get the file from the input element
	const file = document.getElementById("file-upload").files[0];
	
	// Create a new unique file name
	const fileName = new Date().toISOString() + "_" + file.name;
	
	// Upload the file to Firebase storage
	const uploadTask = storage.child(fileName).put(file);
	
	// Listen for the upload to finish
	uploadTask.on("state_changed", function(snapshot) {
		// Update the progress bar if needed
	}, function(error) {
		// Handle any errors
		console.error(error);
	}, function() {
		// Store the file metadata in Firebase database
		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			const fileData = {
				name: file.name,
				url: downloadURL
			};
			database.push(fileData);})})})
