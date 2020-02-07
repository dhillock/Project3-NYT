$(document).ready(function() {
  $(".xxdropDown").change(function(selected) {
    //

    let userSelected = $(".xxdropDown").val();

    // console.log(userSelected);
    // alert("asdfasdf");

    $.ajax({
      dataType: "json",
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${userSelected}.json?api-key=HxZYvgzO9JlxK5V2CK7GKd7i5WsBPHnI`
    })

      .done(function(data) {
        //
        console.log(data); /* Show the while array */

        // jQuery array loop
        $.each(data.results, function(index, value) {
          // if (index > 0) return false;

          let nycImage = data.results[index].multimedia[3].url; // direct link to the image
          let nycAbstract = data.results[index].abstract; // abstract terxt for the article
          let nycUrl = data.results[index].url; // direct link to the article

          console.log(nycAbstract, nycImage, nycUrl);
          // console.log(`${index}: ${value.title}`);
          // console.log(nycUrl);

          $(".nycArticles").append(
            `<div class = "article" > 
            <p>this is the abstract: ${nycAbstract} 
            </p>
            <a 
            href="${nycUrl}" 
            > 
            <img src = ${nycImage} 
            /> 
            </a>
            </div>`
          );
        });
        //

        //
      })

      .fail(function() {
        alert("dhFail");
      })

      .always(function() {
        console.log("Always...the end");
      });
  }); // end of dropDown listener
  //
}); // end of initial ready function
