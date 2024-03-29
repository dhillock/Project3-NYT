$(document).ready(function() {
  //
  $(".chzn-select").change(function(selected) {
    //

    let userSelected = $(".chzn-select").val();

    const $waitingSpinner = $(".theSpinner").show();

    // userSelected = "business";

    console.log(userSelected, $waitingSpinner);
    // alert("asdfasdf");

    $waitingSpinner.show();
    $(".nycArticles").empty();

    $.ajax({
      dataType: "json",
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${userSelected}.json?api-key=HxZYvgzO9JlxK5V2CK7GKd7i5WsBPHnI`
    })

      .done(function(sectionData) {
        //
        console.log(sectionData); /* Show the while array */

        // jQuery array loop
        $.each(sectionData.results, function(index, value) {
          if (index > 11) return false; // Want 12 news article

          let nycImageUrl = value.multimedia[0].url;
          let nycAbstract = value.abstract;
          let nycArticleUrl = value.short_url;
          // console.log(value);
          // alert(nycImageUrl);

          // <a href="${nycImageUrl}" > src ="./images/logo_w3s.gif" width="100 height="100 </a>
          // console.log(nycAbstract, nycImage);
          // console.log(nycImageUrl);
          // console.log(nycAbstract);
          // console.log(nycArticleUrl);
          // console.log(`${index}: ${value.title}`);

          $(".nycArticles").append(
            //
            `
            <figure class = "figCell" > 

            <a href="${nycArticleUrl}" target="new">  <img class = articleImage src ="${nycImageUrl}" >  

                <p class="abstract"> ${nycAbstract} 
                </p>
            
            </a> 

            </figure>
            `
            //
          );
        }); // end of the html build, for the 12 articles
        //
        $waitingSpinner.hide();
      }) // end of the .done function

      .fail(function() {
        //
        $waitingSpinner.hide();

        alert(
          "No data was loaded - Error Code: 26. \n Please choose another section."
        );
      })

      .always(function() {
        // console.log("Always...the end");
        $waitingSpinner.hide();
      });
  }); // end of dropDown listener
  //
}); // end of initial ready function.
