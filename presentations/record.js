var counter = 0;
var SpeechRecognition = window.webkitSpeechRecognition || window.speechRecognition;

var recognition = new SpeechRecognition();

var Content = "";

recognition.continuous = true;

recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
        console.log('Could you please repeat? I didn\'t get what you\'re saying.');
        recognition.stop();
    }
}

function recordAudio() {
    if (Content.length) {
        Content += ' ';
    }
    recognition.start();
}

function stopRecordAudio() {
    recognition.onresult = function (event) {

        var current = event.resultIndex;

        var transcript = event.results[current][0].transcript;

        // Content = Content + transcript + "<br>";
        // document.getElementById("chatbox").innerHTML = "<p class='chats'>" + Content + "</p><br>";

        Content = Content + transcript;
        Content = Content;

        console.log(Content);

        if (counter == 0) {
            var text = {
                text: Content,
            };
            var xhr = new XMLHttpRequest();
            xhr.open(
                "POST",
                "http://763caedda676.ngrok.io/getTitle",
                true
            );
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(text));
            xhr.onload = function () {
                if (this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    console.log(response);
                    document.getElementById("title").innerHTML = response.title;
                }
            };
            counter++;
        }
        else if (counter == 1) {
            var text = {
                text: Content,
            };
            var xhr = new XMLHttpRequest();
            xhr.open(
                "POST",
                "http://763caedda676.ngrok.io/parsetext",
                true
            );
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(text));
            xhr.onload = function () {
                if (this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    console.log(response.type);
                    if (response.type == "bullet") {
                        document.getElementById("para1").innerHTML = response.bullet[0];
                    }
                    if (response.type == "image") {
                        $("#image1").append(`<img src="" alt="" class="responsive-img"/>`);
                    }
                    if (response.type == "plot") {
                        if (response.type.plot == "bar") {
                            $("#graph1").append(`<img src="../assets/img/barChart.png" alt="" class="responsive-img"/>`);
                        }
                        if (response.type.plot == "line") {
                            $("#graph1").append(`<img src="../assets/img/barChart.png" alt="" class="responsive-img"/>`);
                        }
                        if (response.type.plot == "pie") {
                            $("#graph1").append(`<img src="../assets/img/pieChart.png" alt="" class="responsive-img"/>`);
                        }
                    }
                }
            };
            counter++;
        }
        else if (counter == 2) {
            var text = {
                text: Content,
            };
            var xhr = new XMLHttpRequest();
            xhr.open(
                "POST",
                "http://763caedda676.ngrok.io/parsetext",
                true
            );
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(text));
            xhr.onload = function () {
                if (this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    console.log(response.type);
                    if (response.type == "bullet") {
                        document.getElementById("para2").innerHTML = response;
                    }
                    if (response.type == "image") {
                        document.getElementById("image2").innerHTML = response;
                    }
                    if (response.type == "plot") {
                        document.getElementById("graph2").innerHTML = response;
                    }
                }
            };
            counter++;
        }
        Content = "";

    };
    recognition.stop();
}

function downloadPresentation() {
    print();
}

// bar, pie, line