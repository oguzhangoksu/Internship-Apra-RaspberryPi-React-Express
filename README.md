# CihazTarama


The app.js file inside the Raspbbery+Server folder should be placed inside the Raspberry Pi.

Simply download the Frontend and Raspbbery+Server files.

The server's IP address is accessed on the Raspberry Pi via axios-express. A connection is established between the server's socket.io and the Raspberry Pi's socket.io, through which information is transmitted. The transmitted connections go directly to React on the server side, while also being transferred to MYSQL

On the first page, the real-time information indicating which Raspberry Pis are powered on is displayed within the green and red boxes at the top, while in the middle of the page, the Raspberry Pi's own information is compactly presented inside a small box.

![FirstPage](https://github.com/oguzhangoksu/Internship-CihazTarama/assets/70150316/09164df3-0e6f-4468-8d7c-11433a4c2c8a)

-------------------------------------------------------------------------------------------------------------------------------
When the small boxes in the middle are clicked, a page is created that displays the Raspberry Pi's own information in a more detailed manner, including real-time data presented in graphical form.

![SecondPage](https://github.com/oguzhangoksu/Internship-CihazTarama/assets/70150316/53d2520f-63bb-4dac-90c7-b71fd1482693)
