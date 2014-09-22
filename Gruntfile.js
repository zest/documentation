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
        // get this package details
        pkg: grunt.file.readJSON('package.json'),
        // clean configuration
        clean: [
            '.out'
        ],
        // copy configuration
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
        // markdown parsing configuration
        markdown: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'markdowns/',
                    src: ['**/*.md'],
                    dest: '.out/site',
                    ext: '.html',
                    rename: function (dest, src) {
                        // flattening the files. Themes wont work otherwise
                        return dest + '/' + src.replace(/\//g, '-');
                    }
                }],
                options: {
                    template: './statics/template.jst',
                    templateContext: {},
                    postCompile: function(src) {
                        // we need to update the links to work when files are flattened
                        return src.replace(/href=\"(.*?)\"/g, function (match, link) {
                            if(link.indexOf('http') === 0) {
                                // do not touch an http or https link
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
        // watch for file changes
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
    // markdown queue. this task is run everytime any markdown file changes during observe
    grunt.registerTask(
        'markdown-queue',
        [
            'clean',
            'markdown:all',
            'copy:statics'
        ]
    );
    // observe task is run during development
    grunt.registerTask(
        'observe',
        [
            'markdown-queue',
            'watch:markdown'
        ]
    );
    // test is for testing in travis. it tries to compile all md files
    grunt.registerTask(
        'test',
        [
            'clean',
            'markdown:all'
        ]
    );
    // observe is the default task
    grunt.registerTask(
        'default',
        [
            'observe'
        ]
    );
};
