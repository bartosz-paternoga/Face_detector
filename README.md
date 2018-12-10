This webapp is a face detector. Every new face wth euclidean distance > 0.4 is recorded, 
with a snapshot sent to ibm cloud storage. Information about date & time, as well as a
link to the pic in cloud storage is recorded in database. Face detector uses face-api.js
for ML algorithm, react UI for a frontend, node.js for a backend and mongoDB database.

To start the face detector go to the 'Cam' tab and press 'Start predict', afterwards 'Stop
predict'. The AI model needs to get loaded before you can begin. The logs with the links
to the snapshots of new faces detected can be retrived from dsatabase (tab 'Data').

Live demo:
https://rocky-cove-67966.herokuapp.com
