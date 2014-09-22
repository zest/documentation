# zest / specifications
> **zest** is an integrator written on node. It integrates components to create an application. To integrate 
> successfully, it needs components to follow a specification. This module lists down the specifications for 
> developing components

## components

Components are blocks of code that can be combined together to create an application. Any soul application can have 
one or more of the below components

1. Application
    - An application is a runnable component that, when run, starts a node server and deploys itself
2. User
    - User Component manages application users. Users use applications to work on data and files. This component also 
      provides interfaces for authenticating, adding, modifying and deleting users.
3. Privilege
    - The Privilege component checks if a user has enough previlige to perform specific work on data and files. It 
    also provides interfaces for adding, modifying and deleting previliges, as well as for granting and revoking 
    privileges from users.
4. DataStore
    - The DataStore component allows persisting and modifying data for later use in the application.
5. FileStore
    - The FileStore component allows persisting and modifying files for later use in the application.

## component providers

Components can be served by **ComponentProviders**. ComponentProviders can be of two types:

1. **Native providers** that use nodejs
2. **Non-Native providers** that run on non native apis. The non-native providers will have adapters to adapt them to 
    node environment. The adapter for the below providers have to be implemented. Other adapters can be plugged in if 
    required.
    1. **REST Provider** provides adapter for components that run on rest apis

Every component is described by an interface in soul and must implement it. The component interfaces are summarized 
below. For a detailed documentation, please go through the JSDocs

## component interfaces

1. **`base/Class`** is the base class for all classes in zest and has the below methods
    1. **`extend()`**
        - this is a static method that extends the class. All extended classes also have the same method.
2. **`base/ComponentProvider`** is the base class for all components and has the below methods
    1. **`describe()`**
        - returns map of settings for the component with their description.
    2. **`init`**`(settings, resolver)`
        - initializes the component
    3. **`export`**`(stream)`
        - exports the component with objects into a stream
    4. **`import`**`(stream)`
        - imports the component from a stream
3. **`base/RunnableProvider`** `extends base/ComponentProvider` is the base class for all 
    runnable components
    1. **`run`**`()`
        - runs the component
4. **`components/ApplicationProvider`** `extends base/RunnableProvider` is an interface describing the 
    specifications for Application Components
    1. **`run`**`()`
        - starts the application using the settings specified
5. **`components/UserProvider`** `extends base/ComponentProvider` is an interface describing the 
    specifications for User Components
    1. **`create`**`(user)`
        - persists a user
    2. **`read`**`(token)`
        - returns the user object from the token
    3. **`update`**`(user)`
        - updates the user object
    4. **`remove`**`(user)`
        - removes a user
    5. **`authenticate`**`(user)`
        - authenticates and returns a token
6. **`components/PrivilegeProvider`** `extends base/ComponentProvider` is an interface describing the 
    specifications for User Privilege Components
    1. **`create`**`(privilege)`
        - persists a privilege
    2. **`read`**`(name)`
        - returns the privilege
    3. **`update`**`(privilege)`
        - updates the privilegeobject
    4. **`remove`**`(privilege)`
        - removes a privilege
    5. **`allow`**`(privilegeName, user)`
        - adds a privilege to a user
    6. **`deny`**`(privilegeName, user)`
        - removes a privilege from a user
    7. **`isPrivileged`**`(user, privilegeName)`
        - checks if a user has a privilege
7. **`components/DataStoreProvider`** `extends base/ComponentProvider` is an interface describing the 
    specifications for Data Store Components
    1. **`create`**`(name, structure)`
        - creates a store and returns a store object
    2. **`read`**`(name)`
        - reads a store by name
    3. **`update`**`(name, structure)`
        - updates a store
    4. **`remove`**`(storeName)`
        - removes a store
    5. **`<store>.create`**`(storeName)`
        - adds a store item to the store
    6. **`<store>.read`**`(storeName, searchQuery)`
        - get an element from the store
    7. **`<store>.update`**`(storeName, item)`
        - updates a store item
    8. **`<store>.remove`**`(storeName, item)`
        - deletes a store item
8. **`components/FileStoreProvider`** `extends base/ComponentProvider` is an interface describing the 
    specifications for File Store Components
    1. **`<directory>.create`**`(path, data)`
        - creates a file or a directory depending on if the path ends in /.
    2. **`<directory>.read`**`(path)`
        - gets contents of a directory
    3. **`<directory>.update`**`(oldPath, newPath)`
        - updates the name of a directory
    4. **`<directory>.remove`**`(path)`
        - deletes a directory
    5. **`<file>.read`**`(path)`
        - reads contents of a file
    6. **`<file>.update`**`(path, data)`
        - updates a file with new contents
    7. **`<file>.remove`**`(path)`
        - deletes a file
    8. **`root`**`()`
        - gets the root folder for the File Store