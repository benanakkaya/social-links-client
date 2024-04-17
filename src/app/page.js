"use client"
import LinkList from "@/components/LinkList/LinkList";
import CostumizeLinks from "@/components/CostumizeLinks/CostumizeLinks";
import MobileMockup from "@/components/MobileMockup/MobileMockup";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, setIsChanged, setNewProfilePicture, swapLinks, updateLinks } from "@/redux/User/UserSlice";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai"


export default function Home() {

  const pathname = usePathname()

  const dispatch = useDispatch();


  const { userInformation, buttonStatus,isChanged, backupInformation } = useSelector(state => state.user)

  const [buttonDisable, setButtonDisable] = useState(false);



  const [error,setError] = useState(false);


  useEffect(() => {
    dispatch(setNewProfilePicture(null));
    if (userInformation.username) {
      dispatch(getUser(userInformation.username))
    }
  }, [pathname])



  const handleSubmit = () => {
    dispatch(updateLinks());
    dispatch(setIsChanged(false));
  }

  const linksControl = () => {
    let error= false;
    const urlControl = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    userInformation.links.forEach(item => {
      if (!urlControl.test(item.link)) {
        setButtonDisable(true);
        setError(true);
        error = true;
      }
    });
    if (error === false) {
      setButtonDisable(false);
    }
  }

  useEffect(() => {
    linksControl();
  }, [userInformation.links])

  useEffect(() => {
    dispatch(setIsChanged(false));
  },[])

  const handleDiscardChanges = () => {
    dispatch(swapLinks(backupInformation.links));
    dispatch(setIsChanged(false));
    setError(false);
  }


  return (
    <div className="w-full flex flex-col gap-6 container p-3">
      <Header pathname={pathname} />
      <div className="grid grid-cols-3 gap-6">
        <MobileMockup />
        <div className="col-span-3 md:col-span-2 bg-white p-6 rounded-lg">
          <div className="w-full flex flex-col gap-8 ">
            <CostumizeLinks />
            <LinkList />
            <div className="w-full flex items-center justify-end gap-4">
              {isChanged === true &&
                <button onClick={handleDiscardChanges} className={`bg-opacity-100 flex items-center justify-center gap-1 w-full md:w-32 bg-gray-600 text-white rounded-lg px-5 py-2 font-bold`}>
                  Discard
                </button>
              }
              <button disabled={(buttonDisable || buttonStatus == false || isChanged == false) ? true : false} onClick={handleSubmit} className={`${(buttonDisable || buttonStatus == false || isChanged == false) ? 'bg-opacity-50' : 'bg-opacity-100'} flex items-center justify-center gap-1 w-full md:w-32 bg-primary  text-white rounded-lg px-5 py-2 font-bold`}>
                {buttonStatus === false &&
                  <AiOutlineLoading3Quarters className="animate-spin " />
                }
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
