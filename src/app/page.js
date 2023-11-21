"use client"
import LinkList from "@/components/LinkList/LinkList";
import CostumizeLinks from "@/components/CostumizeLinks/CostumizeLinks";
import MobileMockup from "@/components/MobileMockup/MobileMockup";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, setNewProfilePicture, updateLinks } from "@/redux/User/UserSlice";
import { useSelector } from "react-redux";
import {AiOutlineLoading3Quarters} from "react-icons/ai"


export default function Home() {

  const pathname = usePathname()

  const dispatch = useDispatch();


  const { userInformation, buttonStatus } = useSelector(state => state.user)

  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    dispatch(setNewProfilePicture(null));
    if (userInformation.username) {
      dispatch(getUser(userInformation.username))
    }
  }, [pathname])



  const handleSubmit = () => {
    dispatch(updateLinks());
  }

  const linksControl = () => {
    let error = false;
    const urlControl = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    userInformation.links.forEach(item => {
      if (!urlControl.test(item.link)) {
          setButtonDisable(true);
          error = true;
          return false;
      }
    });
    if(error === false){
      setButtonDisable(false);
    }
  }

  useEffect(() => {
    linksControl();
  },[userInformation.links])


  return (
    <div className="w-full flex flex-col gap-6 container p-3">
      <Header pathname={pathname} />
      <div className="grid grid-cols-3 gap-6">
        <MobileMockup />
        <div className="col-span-3 md:col-span-2 bg-white p-6 rounded-lg">
          <div className="w-full flex flex-col gap-8 h-[696px]">
            <CostumizeLinks />
            <LinkList />
            <div className="w-full flex items-center justify-end gap-4">
              {buttonDisable && 
              <span className="text-xs italic text-red-500">
              Please fill in all fields!
              </span>
              }
              <button disabled={(buttonDisable || buttonStatus == false) ? true : false} onClick={handleSubmit} className={`${(buttonDisable || buttonStatus == false)  ? 'bg-opacity-50' : 'bg-opacity-100'} flex items-center justify-center gap-1 w-full md:w-32 bg-primary  text-white rounded-lg px-5 py-2 font-bold`}>
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
