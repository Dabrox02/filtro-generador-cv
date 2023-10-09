const hostName = "localhost";
const port = "5010";
const ssl = "http://";
const uri = `${ssl + hostName}:${port}`;

console.log(uri);

export default {
    hostName, port, ssl, uri
}