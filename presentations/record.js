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
                    document.getElementById("para1").innerHTML = "<p class='white-text'>" + response.bullet + "</p>";
                    if (response.type == "image") {
                        imageOf = response.image;
                        var xhr2 = new XMLHttpRequest();
                        xhr2.open(
                            "GET",
                            "https://api.pexels.com/v1/search?query=" + imageOf,
                            true
                        );
                        xhr2.setRequestHeader("Content-Type", "application/json");
                        xhr2.setRequestHeader("Authorization", "563492ad6f917000010000012da74593e6f44f69a1a08440e8772609");
                        xhr2.send(JSON.stringify(text));
                        xhr2.onload = function () {
                            if (this.status == 200) {
                                var response = JSON.parse(this.responseText);
                                console.log(response.photos[0].url);
                                var imageURL = response.photos[0].url;
                                $("#image1").append(`<img src="https://www.pexels.com/photo/two-yellow-labrador-retriever-puppies-1108099/" alt="" class="responsive-img"/>`);
                            }
                        };
                    }
                    if (response.type == "plot") {
                        console.log(response.plot);
                        if (response.plot == "bar") {
                            $("#graph1").append(`<img src="../assets/img/barChart.png" alt="" class="responsive-img"/>`);
                        }
                        if (response.plot == "line") {
                            $("#graph1").append(`<img src="../assets/img/lineChart.png" alt="" class="responsive-img"/>`);
                        }
                        if (response.plot == "pie") {
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
                        document.getElementById("para2").innerHTML = "<p class='white-text'>" + response.bullet + "</p>";
                    }
                    if (response.type == "image") {
                        imageOf = response.image;
                        var xhr2 = new XMLHttpRequest();
                        xhr2.open(
                            "GET",
                            "https://api.pexels.com/v1/search?query=" + imageOf,
                            true
                        );
                        xhr2.setRequestHeader("Content-Type", "application/json");
                        xhr2.setRequestHeader("Authorization", "563492ad6f917000010000012da74593e6f44f69a1a08440e8772609");
                        xhr2.send(JSON.stringify(text));
                        xhr2.onload = function () {
                            if (this.status == 200) {
                                var response = JSON.parse(this.responseText);
                                console.log(response);
                                var imageURL = response.photos[0].url;
                                $("#image2").append(`<img src="${imageURL}" alt="" class="responsive-img"/>`);
                            }
                        };
                    }
                    if (response.type == "plot") {
                        console.log(response.plot);
                        if (response.plot == "bar") {
                            $("#graph2").append(`<img src="../assets/img/barChart.png" alt="" class="responsive-img"/>`);
                        }
                        if (response.plot == "line") {
                            $("#graph2").append(`<img src="../assets/img/lineChart.png" alt="" class="responsive-img"/>`);
                        }
                        if (response.type.plot == "pie") {
                            $("#graph2").append(`<img src="../assets/img/pieChart.png" alt="" class="responsive-img"/>`);
                        }
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