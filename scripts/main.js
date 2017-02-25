(function () {
    'use strict';

    var Cats = getCats();

    function initializeList() {
        Cats.forEach(function (cat) {
            var HTMLImg = '<img src="' + cat.image + '" name="' + cat.id + '">'
            var HTMLdiv = '<div class="catselector-img">' + HTMLImg + '</div>';
            $('.catselector').append(HTMLdiv);
            $('[name="' + cat.id + '"]').click(function () {
                $('.main').removeClass('hide-elem');
                $('.cat-name').text(cat.name);
                $('#score').text(cat.score);
                var properties = {
                    'src': cat.image,
                    'id': cat.id
                }
                $('.main-cat').prop(properties);
                $('.main').removeClass('hide-elem');
            });
        });
    }

    function getCats() {
        var _id = 0;
        var totalCats = 4;
        var catImagesLinks = ['images/cat1.jpg', 'images/cat2.jpg', 'images/cat3.jpg', 'images/cat4.jpg'];
        var catNames = ['Cat One', 'Cat Two', 'Cat Three', 'Cat Four'];
        var cats = [];
        for (var i = 0; i < totalCats; i++) {
            cats.push(new Cat(catNames[i], catImagesLinks[i], _id++));
        }
        return cats;
    }

    function Cat(catName, catImage, _id) {
        return {
            id: 'cat' + _id,
            name: catName,
            image: catImage,
            score: 0
        }
    }

    function init() {
        initializeList();
        var catElemMain = $('.main-cat');
        catElemMain.click(function () {
            var catId = catElemMain.prop('id');
            var selectedCat = Cats.filter(function (cat) {
                return cat.id === catId;
            })[0];
            selectedCat.score++;
            $('#score').text(selectedCat.score);
        });
    }

    init();
    
})();