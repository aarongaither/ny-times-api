var nyt = {
    API_key: "b1cb357a364f43a79c1caec9f95c599c",

    // Searches for given term 
    lookUp: function() {

        // Get values of input boxes
        var q = $("#search-term").val().trim();
        var beginDate = $("#startyear").val().trim();
        var endDate = $("#endyear").val().trim();

        console.log("q:" + q + " beginDate:" + beginDate + " endDate:" + endDate);

        // Create query
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + this.API_key + "&q=" + q;

        // Ensure dates are numbers
        if (parseInt(beginDate) !== NaN && parseInt(beginDate) >= 1900) {
            queryURL += "&begin_date=" + beginDate + "0101";
        }

        if (parseInt(endDate) !== NaN && parseInt(endDate) >= 1900) {
            queryURL += "&end_date=" + endDate + "0101";
        }

        console.log(queryURL);
        // Make AJAX call
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                console.log(response);
                nyt.displayResults(response);
            });
    },

    displayResults: function(response) {
        response = response.response;
        var numReq = $("#drop-down").val();
        console.log("Num of entries: "+numReq);
        for (let i = 0; i < numReq; i++) {
            let article = $('<div>').attr('id', "article").addClass("well well-lg");
            article.append($('<h1>').attr('id', "title").text(response.docs[i].headline.main));
            console.log(response.docs[i].headline.main);
            article.append($('<p>').attr('id', "author").text(response.docs[i].byline.original));
            console.log(response.docs[i].byline.original);
            article.append($('<p>').attr('id', "section").text("Section: "+response.docs[i].section_name));
            console.log(response.docs[i].section_name);
            article.append($('<p>').attr('id', "date").text("Date: "+response.docs[i].pub_date));
            console.log(response.docs[i].pub_date);
            article.append($('<a>').attr('id', "link").attr('href', response.docs[i].web_url).text( response.docs[i].web_url));
            console.log(response.docs[i].web_url);
            $('#articleCont').append(article);
        }
    }
}

$(document).ready(function() {

    // Click event for search button
    $("#search-button").on('click', function() {
        nyt.lookUp();
    });
});
