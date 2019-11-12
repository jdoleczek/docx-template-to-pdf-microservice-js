# DOCX template to PDF - microservice

As in title you can find hier server with endpoint
**/docx/pdf** that might be used for filling templates
written as DOCX files. Rest API description below.

Templats description might be found at
http://guigrpa.github.io/2017/01/01/word-docs-the-relay-way/ .

### Stack

* **Node JS**,
* **Express**,
* **Vagrant**,
* [**docx-templates**](https://www.npmjs.com/package/docx-templates),
* [**office-to-pdf**](https://www.npmjs.com/package/office-to-pdf),
* Vue JS,
* jQuery,
* Bootstrap 3.

### Run
#### OPTION 1: As Node server

    git clone https://github.com/jdoleczek/docx-template-to-pdf-microservice-js.git
    cd docx-template-to-pdf-microservice-js
    npm i
    sudo node server.js

Then just open http://localhost:8000/ for an example.

For this option **soffice** (LibreOffice) program
is required to be installed.

#### OPTION 2: With Vagrant

    git clone https://github.com/jdoleczek/docx-template-to-pdf-microservice-js.git
    cd docx-template-to-pdf-microservice-js
    vagrant up

Then just open http://192.168.0.201:8000/ for an example.
You may change IP in Vagrant file.

#### OPTION 3: With Docker
    
    git clone https://github.com/jdoleczek/docx-template-to-pdf-microservice-js.git
    cd docx-template-to-pdf-microservice-js
    docker-compose up

Then just open http://192.168.99.100:8000/ for an example.
You may need to change the IP depending on how docker is set up on your machine.


#### Rest API description

There is only one **POST** end-point: **/docx/pdf**
that accepts JSON data in format:

    {
      data: {
        templates: 'data'
      },
      file: '...DOCX file encoded with Base64...'
    }

In return we get also JSON:

    {
      status: 'ok',
      file: '...PDF file encoded with Base64...'
    }

##### Example

    let payload = {
      data: {
        person: {
            name: 'Jan',
            surname: 'Kowalski'
        },
        title: 'Przezawodnik miesiąca',
      },
      file: ...
    }

    $.ajax({
      url: '/docx/pdf',
      type: 'POST',
      data: JSON.stringify(payload),
      contentType: 'application/json',
    })
      .then(data => {
        console.log(data.file)
      })

