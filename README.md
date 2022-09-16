MusicWorld

This project was made as a university project, which i found very interesting to work on, regarding my passion about music.

This Web application works as a music player, which plays music after clicking on the music icon on each song in the list. When the button is clicked, the audio tag plays the song, based on the audio path in the json file. The pop-up window shows information about the song (song name, length, genre, performer and album), and starts playing the song, which you can speed up or slow down, pause and play, and download to your device. Information about the songs are stored in a JSON file. In the top left corner, you can find a small heart which has white borders. By clicking on it, you mark the song as your favorite. That information is held in the Local storage of the browser, so everyone who opens the app on their device, can mark their own prefered songs. By clicking the exit button at the bottom of the pop-up, the song stops playing and you are able to se the list of all songs again.

You can search songs by the song name, the album the song belongs to, and the performer who performs the song. You can also sort all the songs by different criteria. The song list will update after clicking the 'search' icon, not before that. By clicking the 'reset' button, you will see the initial list with all songs. Clicking the 'use last filter' button, you will see the results of your last search. This inforamation is held in the Local storage of the browser, so the information about the last search will be available even after closing the app an re-running it again.

When filering is used, you can copy the URL to a new tab, which will show you the results with the criteria you have set. This is achieved by using history.pushstate, and constructiong the URL based on the set critera.

All the functionalities are done using JavaScript, the data is located in a JSON file, and the design are done using CSS. 

The background is made out of my laptop background, using some basic editing such as blur and mirroring. All the colors on the app are based on the background color. And all the buttons are designed by myself, using online vector editors.
