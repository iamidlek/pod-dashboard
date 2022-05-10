import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { inject, observer } from "mobx-react";
import TestStore from "./store/podStore";

interface InitResponse {
  apiVersion: string;
  items: Item[];
  kind: string;
  metadata: { resourceVersion: string };
}

interface Item {
  metadata: {
    annotations: { [key: string]: string };
    creationTimestamp: string;
    labels: { component: string };
    managedFields: any;
    name: string;
    namespace: string;
    resourceVersion: string;
    uid: string;
  };
  spec: {
    containers: any[];
    dnsPolicy: string;
    nodeName: string;
    preemptionPolicy: string;
    restartPolicy: string;
    schedulerName: string;
    serviceAccount: string;
    serviceAccountName: string;
    terminationGracePeriodSeconds: number;
    priority: number;
    tolerations: any[];
    volumes: any[];
    enableServiceLinks: boolean;
  };
  status: {
    conditions: any[];
    containerStatuses: any[];
    hostIP: string;
    phase: string;
    podIP: string;
    podIPs: any[];
    qosClass: string;
    startTime: string;
  };
}

interface Iallpods {
  [key: string]: {
    name: string;
    namespace: string;
    statusPhase: string;
  }[];
}

interface StoreProps {
  store?: StoreType;
}

interface StoreType {
  Podstore: TestStore;
}

const App = inject("store")(
  observer(({ store }: StoreProps) => {
    const { allPods, init } = store!.Podstore;
    // let resourceVersion: string;
    // const utf8Decoder = new TextDecoder("utf-8");
    // const [allPods, setAllPods] = useState<Iallpods>({
    //   node1: [
    //     {
    //       name: "gara1",
    //       namespace: "없는 가상",
    //       statusPhase: "Running",
    //     },
    //     {
    //       name: "gara2",
    //       namespace: "없는 가상",
    //       statusPhase: "Running",
    //     },
    //   ],
    // });

    // const setPodInfo = (pods: Item[]) => {
    //   const newAllpods: Iallpods = {};
    //   pods.forEach((pod) => {
    //     if (!pod.spec.nodeName) return;
    //     if (!newAllpods[pod.spec.nodeName]) {
    //       newAllpods[pod.spec.nodeName] = [
    //         {
    //           name: pod.metadata.name,
    //           namespace: pod.metadata.namespace,
    //           statusPhase: pod.status.phase,
    //         },
    //       ];
    //     } else {
    //       newAllpods[pod.spec.nodeName].push({
    //         name: pod.metadata.name,
    //         namespace: pod.metadata.namespace,
    //         statusPhase: pod.spec.nodeName,
    //       });
    //     }
    //   });
    //   setAllPods(newAllpods);
    // };

    // const processText = async ({ done, value }: any, stream: any) => {
    //   if (done) {
    //     console.log("Request terminated");
    //     return;
    //   }
    //   console.log("pt called");
    //   const event = JSON.parse(utf8Decoder.decode(value));
    //   console.log(event);

    //   try {
    //     const res = await stream.read();
    //     processText(res, stream);
    //   } catch {
    //     console.log("stream fail");
    //   }
    // };

    // const createStream = async () => {
    //   try {
    //     // ReadableStream
    //     const response = await fetch(
    //       `/api/v1/pods?watch=1&resourceVersion=${resourceVersion}`
    //     );
    //     console.log("body", response);
    //     if (!response.body) {
    //       return console.log("nobody");
    //     }
    //     const stream = response.body.getReader();
    //     try {
    //       const res = await stream.read();
    //       processText(res, stream);
    //     } catch {
    //       console.log("stream fail");
    //     }
    //   } catch (error) {
    //     console.log("error");
    //     setTimeout(() => createStream(), 5000);
    //   }
    // };

    useEffect(() => {
      init();
      console.log("pushtest");
    }, []);
    return (
      <div className="App">
        {Object.entries(allPods).map(([nodeName, pods]) => {
          return (
            <React.Fragment key={nodeName}>
              <div className="nodeBox">
                <p className="nodeName">{nodeName}</p>
                <div className="display">
                  <div className="podBox">
                    {pods.map((pod) => (
                      <div className="pod" key={nodeName + pod.name}></div>
                    ))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  })
);

export default App;
