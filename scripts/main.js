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
            this.selectedCat = null;
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
                    .replace(new RegExp('{{cat.id}}', 'g'), cat.id).replace(new RegExp('{{cat.name}}', 'g'), cat.name);
                this.catList.append(HTMLThumbnailTemplate);
                $('[name="' + cat.id + '"]').click(function () {
                    Controller.setSelectedCat(Controller.getCatById(cat.id));
                    CatMainView.render();
                    AdminFormView.hide();
                });
            }, this);
        }
    }

    var CatMainView = {
        init: function () {
            this.catName = $('.cat-name');
            this.scoreElem = $('#score');
            this.mainCat = $('.main-cat');
            this.mainCat.click((function () {
                var catId = this.mainCat.prop('id');
                var selectedCat = Controller.getSelectedCat();
                Controller.updateScoreOfCat(selectedCat);
                $('#score').text(selectedCat.score);
            }).bind(this));
            this.render();
        },

        render: function () {
            var selectedCat = Controller.getSelectedCat();
            this.catName.text(selectedCat.name);
            this.scoreElem.text(selectedCat.score);
            var properties = {
                'src': selectedCat.image,
                'id': selectedCat.id
            }
            this.mainCat.prop(properties);
        }
    }

    var AdminFormView = {
        init: function () {
            this.adminButton = $('#admin-button');
            this.cancelButton = $('#cancel-button');
            this.submitButton = $('#submit-button');
            this.form = $('#form-content');
            this.inputName = $('#cat-name');
            this.inputURL = $('#cat-url');
            this.inputScore = $('#cat-score');
            this.hidden = true;

            this.adminButton.click((function () {
                this.toggleVisibility();
                this.render();
            }).bind(this));

            this.cancelButton.click((function () {
                this.hide();
            }).bind(this));

            this.submitButton.click((function () {
                var newName = this.inputName.val();
                var newScore = this.inputScore.val();
                var newURL = this.inputURL.val();
                Controller.updateCurrentCat(newName, newURL, newScore);
                CatMainView.render();
            }).bind(this));
        },

        render: function () {
            var selectedCat = Controller.getSelectedCat();
            this.inputName.val(selectedCat.name);
            this.inputScore.val(selectedCat.score);
            this.inputURL.val(selectedCat.image);
        },

        hide: function () {
            this.inputName.val('');
            this.inputScore.val('');
            this.inputURL.val('');
            this.form.addClass('hide-content');
            this.hidden = !this.hidden;
        },

        show: function () {
            this.form.removeClass('hide-content');
            this.hidden = !this.hidden;
        },

        toggleVisibility: function () {
            if (this.hidden) {
                this.show();
            }
            else {
                this.hide();
            }
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
            Model.selectedCat = cat;
        },

        getSelectedCat: function () {
            return Model.selectedCat;
        },

        updateCurrentCat: function (name, imageURL, score) {
            var cat = this.getSelectedCat();
            cat.name = name;
            cat.image = imageURL;
            cat.score = score;
        },

        init: function () {
            Model.init();
            Model.selectedCat = Model.getCats()[0];
            CatListView.init();
            CatMainView.init();
            AdminFormView.init();
        }
    }

    Controller.init();

})();