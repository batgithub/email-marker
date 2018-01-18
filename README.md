#Create easy maintainable email with separate data file.
The first idea was to create monthly Newsletter which can be editable by communication team. But json was not so convenient because it's time consuming to debug and i already had to compile the project. A friend create [this tool](https://github.com/kigiri/newsletter) to solve this problem.

Now I use this configuration to create fastly and maintainable email templates. With [Jade](http://jade-lang.com/) for templating and grunt to automatise task like sass compilation and css inliner.

##grunt tasks
- Jade
- inliner
- sass
- Watch

##install
`npm install` to install the project with node js.
`grunt` to launch watch tasks
`grunt deploy` to export in dist folder, an HTML inline file.  

##Jade mixins
###bullet proof button email from Campaingn Monitor
[Bulletproof email buttons](https://buttons.cm/).

###margin
I don't use margin and padding because i had too much pain with client compatibility. Even if they are compatible with pretty every email client according [Campaign Monitor](https://www.campaignmonitor.com/css/). It's working like that so i continue in this way.
I create a mixins for spacing which is use like this `+margin(10,10)` in Jade. The first argument is for top/bottom margin, The second is for left/right margin.
This will create this HTML:
```HTML
<td height="10" style="border-collapse: collapse; line-height: 10px; font-size: 40px; width: 10;" width="10">&nbsp;</td>
```

##Tricks
###Content padding left/right
This trick allow me to write less code, it's just limit by a percentage of the container.
```html
<table align="center" width="90%"></table>
````
###Max-width
To have a fluid basic layout with max-width Outlook-friendly i use [this trick](https://stackoverflow.com/questions/2426072/is-there-an-equivalent-of-css-max-width-that-works-in-html-emails)

###Reset
I use this properties 'border="0" cellpadding="0" cellspacing="0"' on table tag to reset the default behavior.

###The basic templates
It's gonna give you something like this.

index.jade
```
    body
        table(border="0" cellpadding="0" cellspacing="0") // control the background-color
            tbody
                tr
                    td
                    td(valign="top" align="center" width="480")// control the content layout
                        table(border="0" cellpadding="0" cellspacing="0")
                            tbody
                                include path/content.jade


                    td

```

content.jade
```
tr
    td
        table(border="0" cellpadding="0" cellspacing="0" width="100%")
            tbody
                tr
                    +margin(24)
                tr
                    td
                        table(border="0" cellpadding="0" cellspacing="0" align="center" width="90%")
                            tbody
                                tr
                                    |blablablabla blablabla

```
