import React from 'react';
import isIPFS from 'is-ipfs';

/**
 * Name, description and validation logics for each of the oracle data sources
 *
 */
const OracleDataSources = [
    {
      name: 'URL',
      descriptionComponent() {
        return (<div>The URL data source type enables access to any API or web page on the Internet.
          It supports both HTTP GET and HTTP POST request. If only one parameters is specified in the query,
          the service will default to perform an HTTP GET request. If a second parameter is specified,
          then the service will perform an HTTP POST request, posting the second parameter as data.
          Note that if the second parameter is valid JSON, then it will be posted as such.
          The URL data source type supports TLSNotary Proofs and Android Proofs.
          More advanced HTTP capabilities, such as Basic Authentication or OAuth,
          can be build by leveraging the computation data source type.</div>);
      },
      queryHint() {
        return (<div>Query should be a valid URL or one coated in a <a href="http://docs.oraclize.it/#general-concepts-parsing-helpers">parsing helper</a>
          </div>);
      },
      isQueryValid(query) {
        // regex tests to ensure a url is within the query
        return (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+"))
            .test(query);
      },
      sampleQueries: [
        'json(https://api.gdax.com/products/BTC-USD/ticker).price - Price of BTC-USD on GDAX',
        'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.p.1 - Volume Weight Average Price (24 hrs) of ETH-USD on Kraken',
        'json(https://api.bitfinex.com/v1/pubticker/omgeth).mid - Mid Price of OMG-ETH',
      ]
    },
    {
      name: 'WolframAlpha',
      descriptionComponent() {
        return (<div>The WolframAlpha data source type enables direct access to the WolframAlpha Knowledge Engine API.
          This data source expects a string as the sole parameter which is then passed to WolframAlpha.</div>);
      },
      queryHint() {
        return (<div>A valid WolframAlpha alpha query is required. For example try: <strong>AAPL Price</strong></div>);
      },
      isQueryValid(query) {
        return query.length !== 0;
      },
      sampleQueries: [
        'AAPL Price',
        'Temperature in Boulder, CO',
        'S&P 500 Index Price'
      ]
    },
    {
      name: 'IPFS',
      descriptionComponent() {
        return (<div>The IPFS data source type can be used to retrieve the content of a file on the IPFS network.
          <br/>
          This datasource expects as sole parameter the IPFS multihash in the query. For example,
          the file QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o would return `“hello world\n”.
          <br/>
          If Oraclize fails to fetch the IPFS content within 20 seconds, the request will fail.
          </div>);
      },
      queryHint() {
        return (<div>A valid IPFS hash is required. For example try: <strong>QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o</strong></div>);
      },
      isQueryValid(query) {
        return isIPFS.multihash(query);
      },
      sampleQueries: [
        'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o'
      ]
    },
    {
      name: 'computation',
      descriptionComponent() {
        return (<div>
          The computation datasource enables the auditable execution of an application or a script by leveraging
          a sandboxed Amazon Web Service virtual machine.
          <br/>
          The application has to print, on standard output, the result of the computation as the last line before
          it quits. The result can be up to 2500 characters long. The execution context has to be described by a Dockerfile,
          where building and running it should start the main application straight away. Currently Oraclize only
          provides one type of auditable instance: a t2.micro instance. The Dockerfile initialization and
          application execution should terminate as soon as possible, as the execution time is capped at 5 minutes.
          <br/>
          The developer can send to Oraclize the application binary or the script, its dependency and the
          Dockerfile by creating an archive and uploading it to IPFS. The query expects as first argument
          the IPFS multihash of that archive, while the following arguments will be passed to the execution
          environment as environmental variables, making them accessible by the application.
        </div>);
      },
      queryHint() {
        return (<div>The query expects as first argument
          the IPFS multihash of the uploaded archive, while the following arguments will be passed to the execution
          environment as environmental variables, making them accessible by the application.</div>);
      },
      isQueryValid(query) {
        return query.length !== 0;
      },
      sampleQueries: [
        'QmRxtL9K2de7v7QBYCCrwcjZHjYmuKggZ8xaqZ6UUWvd1s'
      ]
    }
  ];

export default OracleDataSources;
