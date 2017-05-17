import React from 'react'
import classnames from 'classnames'

import Anchor from '../../components/atoms/Anchor'
// import Panel from '../../components/organisms/Panel'
import RoomListing from '../../components/organisms/RoomListing'
import style from '../styles/Dashboard.css'

const Rooms = ({
  children
}) => {
  const childrenComp = children !== null ? children : <RoomListing rooms={[
    {
    "id": 1,
    "name": "Autem porro in rerum.",
    "user_id": 1,
    "address": "4455 Rippin Mall\nLittleview, WA 69991",
    "lat": -6.979779,
    "lng": 107.630798,
    "base_price": 120000,
    "capacity": 3,
    "min_stay": 1,
    "max_stay": 365,
    "description": "Cupiditate iste dolores et consequatur. Enim assumenda deleniti quia quaerat eligendi quas. Quidem aliquid perspiciatis ut exercitationem. Tempora et non expedita voluptatem dolorem.\nAt perferendis a explicabo tempora quia sed ea. Odit doloremque explicabo aut distinctio tempora maxime quasi. Non molestiae et impedit sed qui et.\nEst maxime voluptatem accusantium omnis. Neque ad sint velit omnis quas esse.",
    "status_id": 5,
    "created_at": "2017-05-07 07:25:23",
    "updated_at": "2017-05-07 07:25:23",
    "deleted_at": null,
    "room_pictures": [
      {
        "id": 1,
        "room_id": 1,
        "url": "http://lorempixel.com/800/400/city/Faker/?48624",
        "created_at": "2017-05-07 07:25:23",
        "updated_at": "2017-05-07 07:25:23",
        "deleted_at": null
      }
    ],
    "room_amenities": [
      {
        "id": 1,
        "room_id": 1,
        "amenity_id": 1,
        "values": 1,
        "description": "Springbed",
        "created_at": "2017-05-07 07:25:23",
        "updated_at": "2017-05-07 07:25:23",
        "deleted_at": null,
        "amenity": {
          "id": 1,
          "name": "Kasur",
          "icon": "hotel",
          "created_at": "2017-05-07 07:25:23",
          "updated_at": "2017-05-07 07:25:23",
          "deleted_at": null
        }
      },
      {
        "id": 2,
        "room_id": 1,
        "amenity_id": 2,
        "values": 1,
        "description": "TV LED 40\"",
        "created_at": "2017-05-07 07:25:23",
        "updated_at": "2017-05-07 07:25:23",
        "deleted_at": null,
        "amenity": {
          "id": 2,
          "name": "TV",
          "icon": "tv",
          "created_at": "2017-05-07 07:25:23",
          "updated_at": "2017-05-07 07:25:23",
          "deleted_at": null
        }
      }
    ],
    "user": {
      "id": 1,
      "name": "Developer",
      "email": "developer@rumantara.com",
      "created_at": "2017-05-07 07:25:22",
      "user_profile": {
        "id": 1,
        "user_id": 1,
        "no_ktp": "3d10b94c-c1a2-3d61-8c59-7727fd5669f4",
        "gender": "Pria",
        "birth_date": "1975-12-24",
        "phone_number": "+8754285381891",
        "address": "92724 Rupert Corner Apt. 461\nLake Kale, NE 27286",
        "about_me": "Incidunt recusandae enim non nam.",
        "profile_photo_url": "http://lorempixel.com/600/400/cats/Faker/?67119",
        "ktp_photo_url": "http://lorempixel.com/600/400/cats/Faker/?12390",
        "status_id": 3,
        "created_at": "2017-05-07 07:25:23"
      }
    }
  },
  {
    "id": 2,
    "name": "Saepe nemo maiores quibusdam qui et deleniti ut.",
    "user_id": 2,
    "address": "9842 Douglas Rapids\nLake Zoe, RI 18173-8048",
    "lat": -6.979779,
    "lng": 107.630798,
    "base_price": 120000,
    "capacity": 3,
    "min_stay": 1,
    "max_stay": 365,
    "description": "Molestias sed recusandae hic officia vel. Natus dicta ut beatae asperiores.\nAut quaerat deserunt et ipsam. Aliquid quo explicabo molestiae qui beatae optio dicta.\nConsequatur non voluptates soluta unde aut voluptatem quo. Et inventore alias aut fugiat sit ut labore. Excepturi temporibus earum unde alias natus.\nIpsam ut quo odio. Ex qui rerum quo nemo nihil omnis vitae. Eius nulla labore voluptas sed eos. Architecto repellat molestiae sunt omnis iusto cum.",
    "status_id": 6,
    "created_at": "2017-05-07 07:25:23",
    "updated_at": "2017-05-07 07:25:23",
    "deleted_at": null,
    "room_pictures": [
      {
        "id": 2,
        "room_id": 2,
        "url": "http://lorempixel.com/800/400/city/Faker/?78531",
        "created_at": "2017-05-07 07:25:23",
        "updated_at": "2017-05-07 07:25:23",
        "deleted_at": null
      }
    ],
    "room_amenities": [
      {
        "id": 3,
        "room_id": 2,
        "amenity_id": 1,
        "values": 1,
        "description": "Springbed",
        "created_at": "2017-05-07 07:25:23",
        "updated_at": "2017-05-07 07:25:23",
        "deleted_at": null,
        "amenity": {
          "id": 1,
          "name": "Kasur",
          "icon": "hotel",
          "created_at": "2017-05-07 07:25:23",
          "updated_at": "2017-05-07 07:25:23",
          "deleted_at": null
        }
      }
    ],
    "user": {
      "id": 2,
      "name": "Nama Baru",
      "email": "user@rumantara.com",
      "created_at": "2017-05-07 07:25:22",
      "user_profile": {
        "id": 2,
        "user_id": 2,
        "no_ktp": "2b6d203c-e219-3558-ab37-310fe6ab4b2f",
        "gender": "Pria",
        "birth_date": null,
        "phone_number": null,
        "address": null,
        "about_me": null,
        "profile_photo_url": null,
        "ktp_photo_url": null,
        "status_id": 1,
        "created_at": "2017-05-07 07:25:23"
      }
    }
  },
  {
    "id": 3,
    "name": "Aut optio magnam unde accusantium id.",
    "user_id": 2,
    "address": "63490 Waylon Road Suite 883\nEast Crystelton, NY 96969-5613",
    "lat": -6.979779,
    "lng": 107.630798,
    "base_price": 120000,
    "capacity": 3,
    "min_stay": 1,
    "max_stay": 365,
    "description": "In quo perferendis placeat sint animi. Est odio autem ipsa recusandae ut sit sit.\nSed ducimus dolorum nesciunt. Consequatur consequatur tenetur sit aliquam natus adipisci id.\nVoluptatibus repellat placeat doloremque quibusdam illum expedita aut. Aut velit minima adipisci iusto maiores corporis. Harum nemo voluptas quis atque deserunt quia perferendis. Saepe voluptatem quia qui officiis.",
    "status_id": 5,
    "created_at": "2017-05-07 07:25:23",
    "updated_at": "2017-05-07 07:25:23",
    "deleted_at": null,
    "room_pictures": [
      {
        "id": 3,
        "room_id": 3,
        "url": "http://lorempixel.com/800/400/city/Faker/?94151",
        "created_at": "2017-05-07 07:25:23",
        "updated_at": "2017-05-07 07:25:23",
        "deleted_at": null
      }
    ],
    "room_amenities": [
      {
        "id": 4,
        "room_id": 3,
        "amenity_id": 1,
        "values": 1,
        "description": "Springbed",
        "created_at": "2017-05-07 07:25:23",
        "updated_at": "2017-05-07 07:25:23",
        "deleted_at": null,
        "amenity": {
          "id": 1,
          "name": "Kasur",
          "icon": "hotel",
          "created_at": "2017-05-07 07:25:23",
          "updated_at": "2017-05-07 07:25:23",
          "deleted_at": null
        }
      }
    ],
    "user": {
      "id": 2,
      "name": "Nama Baru",
      "email": "user@rumantara.com",
      "created_at": "2017-05-07 07:25:22",
      "user_profile": {
        "id": 2,
        "user_id": 2,
        "no_ktp": "2b6d203c-e219-3558-ab37-310fe6ab4b2f",
        "gender": "Pria",
        "birth_date": null,
        "phone_number": null,
        "address": null,
        "about_me": null,
        "profile_photo_url": null,
        "ktp_photo_url": null,
        "status_id": 1,
        "created_at": "2017-05-07 07:25:23"
      }
    }
  },
  {
    "id": 4,
    "name": "Iure consectetur fugiat distinctio dolore eligendi.",
    "user_id": 2,
    "address": "1108 Bauch Forge Apt. 386\nWest Jamalhaven, TN 80473",
    "lat": -6.979779,
    "lng": 107.630798,
    "base_price": 120000,
    "capacity": 3,
    "min_stay": 1,
    "max_stay": 365,
    "description": "Distinctio nihil voluptatem necessitatibus exercitationem. Quam quaerat quia molestiae aut veniam. Suscipit et sit nisi ipsa facere. Id mollitia est culpa.\nEius earum porro nesciunt iusto. Suscipit minima voluptatem autem fugiat et ab. Natus dolor quasi ex vero quis labore sit. Et necessitatibus nihil consequuntur animi.\nQuis quae deleniti cumque cum omnis quae corporis. Fugiat repellendus alias incidunt quia. Enim vitae asperiores architecto voluptatem cupiditate vel.",
    "status_id": 5,
    "created_at": "2017-05-07 07:25:23",
    "updated_at": "2017-05-07 07:25:23",
    "deleted_at": null,
    "room_pictures": [
      {
        "id": 4,
        "room_id": 4,
        "url": "http://lorempixel.com/800/400/city/Faker/?39729",
        "created_at": "2017-05-07 07:25:23",
        "updated_at": "2017-05-07 07:25:23",
        "deleted_at": null
      }
    ],
    "room_amenities": [],
    "user": {
      "id": 2,
      "name": "Nama Baru",
      "email": "user@rumantara.com",
      "created_at": "2017-05-07 07:25:22",
      "user_profile": {
        "id": 2,
        "user_id": 2,
        "no_ktp": "2b6d203c-e219-3558-ab37-310fe6ab4b2f",
        "gender": "Pria",
        "birth_date": null,
        "phone_number": null,
        "address": null,
        "about_me": null,
        "profile_photo_url": null,
        "ktp_photo_url": null,
        "status_id": 1,
        "created_at": "2017-05-07 07:25:23"
      }
    }
  },
  ]} />
  return (
    <section className="pageContainer">
      <div className="row">
        <div className="col-sm-3">
          <ul className={style.sideBarMenuContainer}>
            <li>
              <Anchor to="/dashboard/rooms">Your Listing</Anchor>
            </li>
            <li>
              <Anchor to="/dashboard/rooms">Your Listing</Anchor>
            </li>
            <li>
              <Anchor to="/dashboard/rooms">Your Listing</Anchor>
            </li>
          </ul>
          <Anchor to="/dashboard/rooms/new" className={classnames('btn', style.btnSidebar)}>Add New Listing</Anchor>
        </div>
        <div className="col-sm-9">
          { childrenComp }
        </div>
      </div>
    </section>
  )
}

export default Rooms
