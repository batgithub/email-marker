module.exports = function(grunt){

	//lancement de toutes les tâches sans avoir à les lister
  require('load-grunt-tasks')(grunt);

	//création des tâches
	grunt.initConfig({	//initialisation de l'ensemble des tâches
         sass: {
            dev: {
                    files: {
                        'dev/style.css': 'dev/sass/style.scss'
                },
                    options: {
                    update: true,
                    sourcemap: 'none',
                }
            }
         },
         jsonlint: {
            sample: {
                src: [ 'dev/data.json' ]
            }
          },

         pug: {
            compile: {
               options: {
                   client: false,
                   pretty: true,
                   data: grunt.file.readJSON("dev/data.json")
               },
               files: {
                 'dev/index.html': 'dev/pug/index.pug'
               }
          }
        },

        inlinecss: {
            main: {
                options: {
                    applyWidthAttributes: true,
                    applyHeightAttributes: true,
                    applyAttributesTableElements: true,
                    webResources:{
                        images: false
                    }

                },
                files: {
                    'dist/index-inline.html': 'dev/index.html'
                }
            }
        },

    	watch: {
            options: {
                livereload: 35730
            },
            sass : {
                files: ['dev/sass/**/*.scss'],
                tasks: ['pug','sass:dev'],
                options: { spawn: false, livereload: true }
            },

            grunt: {
                files: ['Gruntfile.js'],
                options: { livereload: true }
            },

            json: {
                files: ['dev/data.json'],
                tasks: ['jsonlint','pug'],
                options: {livereload: true}

            },

            pug: {
                options: {livereload: true},
                files: 'dev/**/*.pug',
                tasks: ['pug']
            }
        }

    });


    //lanceur de tâche

        //Dev - convertisseur pug->HTML et livereload
        grunt.registerTask(
            'default',
            ['watch']
        );

        //Inliner
        grunt.registerTask(
            'deploy',
            ['pug','sass:dev','inlinecss']
        );


}
