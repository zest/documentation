> **zest** is an integrator written on node. It integrates components to create an application. Zest applications are
> also referred to as **integrations** as they are logic-less configurations that specify components that have to be
> integrated.

## the zest embodier

[embodier](http://zest.github.io/integration.embodier/) is an integration built using zest. This integration has a UI 
that can be used to build other integrations.


## components

Components are blocks of code that can be combined together to create an integration. Any zest integration can have 
one or more components.

Components and their structure are detailed [here](http://zest.github.io/base.resolver/).

To create an application, we combine different components.

> For instance, a typical application will contain:
>
> 1.  A **datastore** component to persist data. datastores can be implemented on top of mysql, mongodb, couchdb or any
>     other database.
>
> 2.  A **filestore** component which will serve static files like js, css and htmls for the website.
> 
> 3.  A **user** component to keep track of visitors on the website and to log them in or register them.
> 
> ... 
> 

The component structure allows us to reuse already existing modules to create different integrations.

Although components might not follow any specification, there are a few generic specifications crafted by zest for some
components. Components that follow them can be plugged into [embodier](http://zest.github.io/integration.embodier/)
created integrations.


### component specifications

 1. [datastore components](components/datastore.md)
 2. [filestore components](components/filestore.md)
 3. [user components](components/user.md)
 4. [privilege components](components/privilege.md)
 5. [application components](components/application.md)


### zest native components

For embodier to run, the below stock components are created and maintained. The links go to the jsdoc documentation.

 1. [base.logger](http://zest.github.io/base.logger/)
 2. [datastore.mongo](http://zest.github.io/datastore.mongo/)
 3. [filestore.disk](http://zest.github.io/filestore.disk/)
 4. [privilege.datastore](http://zest.github.io/privilege.datastore/)
 5. [user.datastore](http://zest.github.io/user.datastore/)
 6. [application.rest](http://zest.github.io/application.rest/)
 7. [integration.embodier](http://zest.github.io/integration.embodier/)


## the resolver

These components are integrated and injected into one another using the zest's resolver. The resolver and its cli are
documented here:

 1. [base.resolver](http://zest.github.io/base.resolver/)
 2. [base.resolver-cli](http://zest.github.io/base.resolver-cli/)


## utility modules

Apart from the above components, there are a utility gruntrunner that can be added as a dependency to ease component
development. (All the above components use it) 

 1. [base.gruntrunner](http://zest.github.io/base.gruntrunner/)

-----------------------------------------------------------------------------------------------------------------------
##### [click here for burndown](chart.md)