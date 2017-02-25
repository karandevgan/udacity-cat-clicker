(function () {
    'use strict';

    var Cats = [];

    function Cat(catName, catImage, _id) {
        return {
            id: 'cat' + _id,
            name: catName,
            image: catImage,
            score: 0
        }
    }

    var View = {
        initializeCatThumbnails: function () {
            var ThumbnailTemplate = $('script[data-template="cat-thumbnail"]').html();
            Controller.getCats().forEach(function (cat) {
                var HTMLThumbnailTemplate = ThumbnailTemplate.replace('{{cat.image}}', cat.image)
                    .replace('{{cat.name}}', cat.id);
                $('.catselector').append(HTMLThumbnailTemplate);
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
        },

        initializeMain: function () {
            var catElemMain = $('.main-cat');
            catElemMain.click(function () {
                var catId = catElemMain.prop('id');
                var selectedCat = Controller.getCatById(catId);
                Controller.updateScoreOfCat(selectedCat);
                $('#score').text(selectedCat.score);
            });
        },

        init: function () {
            this.initializeCatThumbnails();
            this.initializeMain();
        }
    }

    var Controller = {
        createCats: function () {
            var _id = 0;
            var totalCats = 4;
            var catImagesLinks = ['images/cat1.jpg', 'images/cat2.jpg', 'images/cat3.jpg', 'images/cat4.jpg'];
            var catNames = ['Cat One', 'Cat Two', 'Cat Three', 'Cat Four'];
            for (var i = 0; i < totalCats; i++) {
                Cats.push(new Cat(catNames[i], catImagesLinks[i], _id++));
            }
        },

        getCats: function () {
            return Cats;
        },

        getCatById: function (id) {
            return Cats.filter(function (cat) {
                return cat.id === id;
            })[0];
        },

        updateScoreOfCat: function (cat) {
            cat.score++;
        },

        init: function () {
            this.createCats();
            View.init();
        }
    }

    Controller.init();

})();