'use strict';
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['.out'],
        copy : {
            statics: {
                files: [
                    {
                        expand: true,
                        cwd: './statics/',
                        src: ['./**'],
                        dest: '.out/site/'
                    }
                ]
            }
        },
        markdown: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'markdowns/',
                    src: ['**/*.md'],
                    dest: '.out/site',
                    ext: '.html'
                }],
                options: {
                    template: './statics/template.jst',
                    templateContext: {},
                    markdownOptions: {
                        gfm: true,
                        highlight: 'manual'
                    }
                }
            }
        },
        // pushing to github pages
        'gh-pages': {
            options: {
                base: '.out/site',
                repo: 'https://' + process.env.GH_TOKEN + '@github.com/zest/<%= pkg.name %>.git',
                clone: '.out/gh_pages',
                message: 'auto commit <%= pkg.name %> on <%= grunt.template.today("yyyy-mm-dd") %>',
                silent: true,
                user: {
                    name: 'travis-ci',
                    email: 'travis-ci@zest.com'
                }
            },
            src: [
                '**'
            ]
        },
        watch: {
            markdown: {
                files: [
                    'markdowns/**',
                    'statics/**'
                ],
                tasks: ['markdown-queue'],
            }
        }
    });
    // document script
    grunt.registerTask(
        'markdown-queue',
        [
            'clean',
            'markdown:all',
            'copy:statics'
        ]
    );
    grunt.registerTask(
        'observe',
        [
            'markdown-queue',
            'watch:markdown'
        ]
    );
    grunt.registerTask(
        'test',
        [
            'clean',
            'markdown:all'
        ]
    );
};
