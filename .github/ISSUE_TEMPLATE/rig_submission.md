name: "Добавить риг"
description: "Предложите новый риг для каталога"
labels: ["new rig"]
body:
  - type: input
    id: rig_name
    attributes:
      label: "Название рига"
      placeholder: "Введите название рига"
    validations:
      required: true

  - type: input
    id: creator
    attributes:
      label: "Создатель"
      placeholder: "Введите имя или ник создателя"
    validations:
      required: true

  - type: input
    id: creator_link
    attributes:
      label: "Ссылка на создателя (необязательно)"
      placeholder: "Введите ссылку на страницу автора"
    validations:
      required: false

  - type: textarea
    id: description
    attributes:
      label: "Краткое описание рига"
      placeholder: "Опишите особенности рига"
    validations:
      required: true

  - type: input
    id: tags
    attributes:
      label: "Теги"
      placeholder: "Например: #minecraft #animation #character"
    validations:
      required: false

  - type: input
    id: preview_image
    attributes:
      label: "Превью (основное изображение)"
      placeholder: "Ссылка на основное изображение рига"
    validations:
      required: true

  - type: textarea
    id: additional_images
    attributes:
      label: "Дополнительные изображения"
      placeholder: "Ссылки на дополнительные изображения (по одному в строке)"
    validations:
      required: false

  - type: input
    id: download_link
    attributes:
      label: "Ссылка на скачивание"
      placeholder: "Добавьте ссылку на скачивание рига"
    validations:
      required: true

  - type: input
    id: more_info
    attributes:
      label: "Ссылка на подробное описание (необязательно)"
      placeholder: "Например, страница с документацией или форум"
    validations:
      required: false
