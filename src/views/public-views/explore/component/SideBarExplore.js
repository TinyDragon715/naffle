import React,{useState} from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import '../css/SideBarExplore.css';

const SideBarExplore = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);

  return (
    <>
      <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
        <h3>Left Sidebar</h3>
      </Sidebar>
      <Button
        icon="pi pi-search"
        onClick={() => setVisibleLeft(true)}
        className="p-mr-2 ExploreSearch"
      />
    </>
  );
};

export default SideBarExplore;
