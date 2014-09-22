'use strict';
module.exports = function (grunt) {
    // for parsing markdown files
    grunt.loadNpmTasks('grunt-markdown');
    // for pushing the website to github site branch
    grunt.loadNpmTasks('grunt-gh-pages');
    // for watching file changes
    grunt.loadNpmTasks('grunt-contrib-watch');
    // for cleaning output directory
    grunt.loadNpmTasks('grunt-contrib-clean');
    // for copying static files
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
                    ext: '.html',
                    rename: function (dest, src) {
                        return dest + '/' + src.replace(/\//g, '-');
                    }
                }],
                options: {
                    template: './statics/template.jst',
                    templateContext: {},
                    postCompile: function(src) {
                        return src.replace(/href=\"(.*?)\"/g, function (match, link) {
                            if(link.indexOf('http') === 0) {
                                return match;
                            }
                            return 'href="' + link.replace(/\//g, '-').replace(/\.md$/, '.html') + '"';
                        });
                    },
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
