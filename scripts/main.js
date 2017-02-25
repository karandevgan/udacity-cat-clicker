(function () {
    'use strict';

    var Model = {
        Cat: function (catName, catImage, _id) {
            return {
                id: 'cat' + _id,
                name: catName,
                image: catImage,
                score: 0
            }
        },

        init: function () {
            this.Cats = [];
            var _id = 0;
            var totalCats = 4;
            var catImagesLinks = ['images/cat1.jpg', 'images/cat2.jpg', 'images/cat3.jpg', 'images/cat4.jpg'];
            var catNames = ['Cat One', 'Cat Two', 'Cat Three', 'Cat Four'];
            for (var i = 0; i < totalCats; i++) {
                this.Cats.push(new this.Cat(catNames[i], catImagesLinks[i], _id++));
            }
        },

        getCats: function () {
            return this.Cats;
        }
    }

    var CatListView = {
        init: function () {
            this.ThumbnailTemplate = $('script[data-template="cat-thumbnail"]').html();
            this.catList = $('.catselector');
            this.render();
        },

        render: function () {
            Controller.getCats().forEach(function (cat) {
                var HTMLThumbnailTemplate = this.ThumbnailTemplate.replace('{{cat.image}}', cat.image)
                    .replace('{{cat.name}}', cat.id);
                this.catList.append(HTMLThumbnailTemplate);
                $('[name="' + cat.id + '"]').click(function () {
                    Controller.setSelectedCat(Controller.getCatById(cat.id));
                    CatMainView.render();
                });
            }, this);
        }
    }

    var CatMainView = {
        init: function () {
            this.catName = $('.cat-name');
            this.scoreElem = $('#score');
            this.mainCat = $('.main-cat');
            this.mainSection = $('.main');
            this.mainCat.click((function () {
                var catId = this.mainCat.prop('id');
                var selectedCat = Controller.getSelectedCat();
                Controller.updateScoreOfCat(selectedCat);
                $('#score').text(selectedCat.score);
            }).bind(this));
        },

        render: function () {
            var selectedCat = Controller.getSelectedCat();
            this.mainSection.removeClass('hide-elem');
            this.catName.text(selectedCat.name);
            this.scoreElem.text(selectedCat.score);
            var properties = {
                'src': selectedCat.image,
                'id': selectedCat.id
            }
            this.mainCat.prop(properties);
        }
    }

    var Controller = {
        getCats: function () {
            return Model.getCats();
        },

        getCatById: function (id) {
            return Model.getCats().find(function (cat) {
                return cat.id === id;
            });
        },

        updateScoreOfCat: function (cat) {
            cat.score++;
        },

        setSelectedCat: function (cat) {
            this.selectedCat = cat;
        },

        getSelectedCat: function () {
            return this.selectedCat;
        },

        init: function () {
            Model.init();
            CatListView.init();
            CatMainView.init();
        }
    }

    Controller.init();

})();