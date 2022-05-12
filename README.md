# React Node TypeScript

This project is boostrapped with [react-node-typescript](https://github.com/mohamedsamara/react-node-typescript)

# Description

<dl>
<dt>
    This project is a template example of React, Stripe and Apple Pay. 
</dt>
</dl>

<dl>
<dt>Libraries Used</dt>

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [React](https://reactjs.org/)

- [Stripe](https://stripe.com/)

</dl>

## Quick start

1.  Clone this repo using `git clone https://github.com/mohamedsamara/react-stripe-apple-pay.git`
2.  Move to the directory: `cd <PROJECT_NAME>`.<br />
3.  Run `yarn install` in order to install dependencies.<br />

## Start development

```
$ yarn run dev
```

## Simple build for production

```
$ yarn build
```

## Run build for production

```
$ yarn start
```

### Prerequisites to see the Apple Pay Button

1. Download [domain association file](https://stripe.com/files/apple-pay/apple-developer-merchantid-domain-association) and host it at unders .well-known directory
2. Download ngrok on your machine to run the website on HTTPS
3. Register the ngrok domain with apple on [stripe tab](https://dashboard.stripe.com/settings/payments/apple_pay)

### Run ngrok

Run ngrok http 8080
<br> OR <br>
ngrok http 8080 -host-header="localhost:8080"
ngrok http --host-header=rewrite 8080
