var common  = require('../../util/common.js');
var expect  = common.expect;

module.exports = [
    {
        name: "args - * group, name and package the same",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();

            //console.log('TEST dirname:', __dirname, ", cwd:", process.cwd());

            ya.add("lodash").load(function(){

                    var _ = ya.get('lodash');
                    expect(_).to.not.be.null;
                    expect(_).to.be.a('function');
                    expect(_.VERSION).to.be.a('string');
                    //console.log('VERSION:', _.VERSION);

                    ya.reset();
                    if(done) done();
                });
        }
    },
    {
        name: "args - * group, custom name and version package",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add("_", "lodash@3.9.0").load(function () {
                var _ = ya.get('_');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);

                ya.reset();
                if (done) done();
            });
        }
    },
    {
        name: "args - util group, custom name and version package",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add("util", "_", "lodash@3.8.x").load(function () {
                var _ = ya.get('util', '_');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);

                ya.reset();
                if (done) done();
            });
        }
    },
    {
        name: "args - util group, array of packages/names",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add("util", ["lodash"]).load(function () {
                var _ = ya.get('util', 'lodash');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);
                if (done) done();
            });
        }
    },
    {
        name: "args - util group, custom name and version package",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add("util", {
                "_": {
                    "package": "lodash"
                }
            }).load(function () {
                var _ = ya.get('util', '_');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);

                ya.reset();
                if (done) done();
            });
        }
    },
    // -------------------------------------
    {
        name: "object - util group and package",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add({
                "util": "lodash"
            }).load(function () {
                var _ = ya.get('util', 'lodash');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);

                ya.reset();
                if (done) done();
            });
        }
    },
    {
        name: "object - util group and package array",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add({
                "util": ["lodash"]
            }).load(function () {
                var _ = ya.get('util', 'lodash');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);
                if (done) done();
            });
        }
    },
    // ------------------------------------------------------
    {
        name: "object - util group, package and args",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add({
                "util": {
                    "numeral": {
                        "package": "numeral",
                        "args": [1234]
                    }
                }
            }).load(function () {
                var numeral = ya.get('util', 'numeral');
                expect(numeral).to.not.be.null;
                expect(numeral).to.be.a('function');
                var num = numeral();
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    // --------------------------------------------------------------------------
    {
        name: "object - util group, package and args",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add({
                "util": {
                    "glob": {
                        "package": "glob",
                        "args": ["../**/advanced.js"]
                    }
                }
            }).load(function () {
                var glob = ya.get('util', 'glob');
                expect(glob).to.not.be.null;
                expect(glob).to.be.a('function');
                glob(function (err, files) {
                    expect(err).to.be.null;
                    //console.log('files:', files);
                    expect(files).to.be.a('array');
                    expect(files[0]).to.equal("../tests/advanced.js");
                    if (done) done();
                });
            });
        }
    },
    // --------------------------------------------------------------------------
    {
        name: "object - util group, package and args with factory",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add({
                "util": {
                    "numeral": {
                        "package": "numeral",
                        "factory": function(numeral){ return numeral(1234); }
                    }
                }
            }).load(function () {
                var num = ya.get('util', 'numeral');

                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    // -------------------------------------
    {
        name: "array - string package name",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add(['numeral']).load(function () {
                var numeral = ya.get('numeral');
                expect(numeral).to.not.be.null;
                expect(numeral).to.be.a('function');

                var num = numeral(1234);
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    {
        name: "array - object",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add([
                {
                    "group":   "util",
                    "name":    "num",
                    "package": "numeral"
                }
            ]).load(function () {
                var numeral = ya.get('util', 'num');
                expect(numeral).to.not.be.null;
                expect(numeral).to.be.a('function');

                var num = numeral(1234);
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    // -------------------------------------
    {
        name: "factory object",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add([
                {
                    "name":    "num",
                    "package": "numeral",
                    "factory":  function(numeral){
                        return numeral(1234);
                    }
                }
            ]).load(function () {
                var num = ya.get('num');
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    // -------------------------------------
    {
        name: "factory object using args",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add([
                {
                    "name":    "num",
                    "package": "numeral",
                    "factory":  function(numeral){
                        return numeral(); // args baked in
                    },
                    "args": [1234]
                }
            ]).load(function () {
                var num = ya.get('num');
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    // -------------------------------------
    {
        name: "get with arguments",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add([
                {
                    "group":   "util",
                    "name":    "num",
                    "package": "numeral"
                }
            ]).load(function () {
                var numeral = ya.get('util', 'num', [1234]);
                expect(numeral).to.not.be.null;
                expect(numeral).to.be.a('function');

                var num = numeral();
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    // -------------------------------------
    {
        name: "getDefault",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add([
                {
                    "group":   "util",
                    "package": "lodash"
                },
                {
                    "group":   "util",
                    "package": "numeral"
                }
            ]).load(function () {
                // first item should be default
                var _ = ya.getDefault('util');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);
                if (done) done();
            });
        }
    },
    {
        name: "default property set to true on plugin definition",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add([
                {
                    "group":   "util",
                    "package": "lodash"
                },
                {
                    "group":   "util",
                    "package": "numeral",
                    "default": true
                }
            ]).load(function () {
                // second item should be set to default
                var numeral = ya.getDefault('util');
                expect(numeral).to.not.be.null;
                expect(numeral).to.be.a('function');

                var num = numeral(1234);
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    {
        name: "setDefault",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add([
                {
                    "group":   "util",
                    "package": "lodash"
                },
                {
                    "group":   "util",
                    "package": "numeral"
                }
            ]).load(function () {
                // set default to second item
                ya.setDefault('util', 'numeral');
                var numeral = ya.getDefault('util');
                expect(numeral).to.not.be.null;
                expect(numeral).to.be.a('function');

                var num = numeral(1234);
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());
                if (done) done();
            });
        }
    },
    // -------------------------------------
    {
        name: "getAll",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();
            ya.add([
                {
                    "group":   "util",
                    "package": "lodash"
                },
                {
                    "group":   "util",
                    "package": "numeral@1.5.3"
                }
            ]).load(function () {
                var plugins = ya.getAll('util');
                var numeral = plugins.numeral;

                expect(numeral).to.not.be.null;
                expect(numeral).to.be.a('function');

                var num = numeral(1234);
                expect(num).to.be.a('object');
                expect(num.format("0,0")).to.equal("1,234");
                //console.log('num:', num.format());

                ya.reset();
                if (done) done();
            });
        }
    },
    // --------------------------------------------------------------------------
    {
        name: "loading file",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();

            ya.add("./_lodash.json").load(function(){

                var _ = ya.get('util', 'lodash');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);

                ya.reset();
                if(done) done();
            });
        }
    },
    {
        name: "loading files",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();

            ya.add(["./_lodash.js"]).load(function(){

                var _ = ya.get('util', '_');
                expect(_).to.not.be.null;
                expect(_).to.be.a('function');
                expect(_.VERSION).to.be.a('string');
                //console.log('VERSION:', _.VERSION);

                ya.reset();
                if(done) done();
            });
        }
    },
    // --------------------------------------------------------------------------
    // Test Errors
    // --------------------------------------------------------------------------
    {
        name: "callback error",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();

            ya.load(function(){
                if(done) done();
            });
        }
    },
    {
        name: "invalid file error",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();

            ya.add(["./_lodash-not-found.js"]).load(function(){
                if(done) done();
            });
        }
    },
    {
        name: "set/get errors",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();

            ya.add("./_lodash.json").load(function(){
                ya.setDefault();
                ya.setDefault('util');
                ya.setDefault('util', 'stumpy');
                ya.getDefault();
                ya.getAll();

                ya.get('lodash', ['args']);
                ya.get('util', 'lodash', 'not-args');

                ya.get('junk', 'no-plugin');

                if(done) done();
            });
        }
    },
    {
        name: "add null errors",
        func: function (yanpm, done) {
            expect(yanpm).to.not.be.null;
            var ya = new yanpm();

            ya.add([
                {
                    group: null
                },
                {
                    name: null
                },
                {
                    package: null
                }
            ]).load(function(){
                if(done) done();
            });
        }
    }
];