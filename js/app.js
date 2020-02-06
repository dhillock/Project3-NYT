$(function() {
  $(".musicButton").on("click", function(event) {
    //
    //
    event.preventDefault();
    //
    let mArtist = $("input[type='text']").val();

    let splitName = mArtist.replace(/ /g, "+");
    // $("input[type='text']").val("");
    // console.log(mArtist);
    // console.log(splitName);

    //  Use the on change method to grab the value of the user dropdown and save it as userSelection
    //${userSelection}

    // console.log(event);

    $.ajax({
      dataType: "json",
      method: "GET",
      url: `https://itunes.apple.com/search?entity=album&limit=6&term=l${splitName}`
    })
      //
      .done(function({ results }) {
        // deconstruction, must be the case sensitive property name
        //
        // jQuery array loop
        // console.log(mData);
        // console.log(mData.results[0].collectionName);
        // console.log(mData.results[0].artistName);
        // console.log(mData.results[0].artworkUrl100);

        $.each(results, function(index, value) {
          let cName = value.collectionName;
          let aName = value.artistName;
          let aCover = value.artworkUrl100;

          $(".album-list").append(
            `<li> <img src="${aCover}"/img> </br> ${cName} </br> ${aName} </li>`
          );
        });
      });
    //
    //end of listener
  });
});

{
}
