$(document).ready(function () {
    const amenities = {};
    $('input.amenity-checkbox:checkbox').change(
      function () {
        if ($(this).is(':checked')) {
          amenities[$(this).data('id')] = $(this).data('name');
        } else {
          delete amenities[$(this).data('id')];
        }
        $('div.amenities h4').text(Object.values(amenities).join(', '));
      }
    );
    $.ajax({
      type: 'GET',
      url: 'http://localhost:5001/api/v1/status/',
      success: function (data) {
        if (data.status === 'OK') {
          $('div#api_status').addClass('available');
        } else {
          $('div#api_status').removeClass('available');
        }
      }
    });

    searchPlaces();

    $('button').click(function () {
        const keys = {'amenities': Object.keys(amenities)}
        console.log(keys)
        searchPlaces(JSON.stringify(keys));
    })
});

function searchPlaces(amenities) {
    if (!amenities || amenities.length === 0) {
        amenities = '{}';
    }
    console.log(amenities)
    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        url: 'http://localhost:5001/api/v1/places_search/',
        data: amenities,
        success: function (places) {
          let places_str = "";
          for (const pl_id in places) {
            article = `
            <article>
                <div class="title_box">
                    <h2>${places[pl_id].name}</h2>
                    <div class="price_by_night">$${places[pl_id].price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${ places[pl_id].max_guest } Guest${(places[pl_id].max_guest) != 1 ? 's' : ''}</div>
                    <div class="number_rooms">${ places[pl_id].number_rooms } Bedroom${(places[pl_id].max_guest) != 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${ places[pl_id].number_bathrooms } Bathroom${(places[pl_id].max_guest) != 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                ${ places[pl_id].description }
                </div>
            </article>
            `
            places_str = places_str.concat(article)
          }
          $('section.places').append(places_str)
        }
    });
}
