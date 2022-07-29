import React, { useState } from "react";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./Graph/authConfig";
import Button from "react-bootstrap/Button";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./Graph/graph";

function App() {
  return (
      <PageLayout>
          <AuthenticatedTemplate>
              <ProfileContent />
              <iframe src="https://prezi.com/p/embed/8ssi4mrhldsj/" id="iframe_container" title="try1" frameBorder="0" allow="autoplay; fullscreen" height="567" width="1008"></iframe>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
              <p>Sign in</p>
          </UnauthenticatedTemplate>
      </PageLayout>
  );
}

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
      const request = {
          ...loginRequest,
          account: accounts[0]
      };

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(request).then((response) => {
          callMsGraph(response.accessToken).then(response => setGraphData(response));
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
              callMsGraph(response.accessToken).then(response => setGraphData(response));
          });
      });
  }

  return (
      <>
          <h5 className="card-title">Welcome {name}</h5>
          {graphData ? 
              <ProfileData graphData={graphData} />
              :
              <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
          }
      </>
  );
};
export default App;