import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  public dummyData = [
    {
      message:'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.',
      createdAt: new Date(),
      sender: {
        firstName: 'kav',
        lastName: 'Khalsa',
        photoUrl: "http://placekitten.com/g/150/150"
      }
    },
    {
      message:'De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia?',
      createdAt: new Date(),
      sender: {
        firstName: 'Sam',
        lastName: 'Smith',
        photoUrl: 'http://placekitten.com/g/150/150'
      }
    },
    {
      message:`Cum horribilem walking dead resurgere de crazed sepulcris creaturis,
       zombie sicut de grave feeding iride et serpens. Pestilentia, shaun ofthe dead scythe animated corpses ipsa screams. Pestilentia est plague haec decaying ambulabat mortuos. `,
      createdAt: new Date(),
      sender: {
        firstName: 'Jonny',
        lastName: 'Walker',
        photoUrl: 'http://placekitten.com/g/150/150'
      }
    },
    {
      message:' Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium.',
      createdAt: new Date(),
      sender: {
        firstName: 'Luke',
        lastName: 'Robby',
        photoUrl: 'http://placekitten.com/g/150/150'
      }
    },
    {
      message:'Qui animated corpse, cricket bat max brucks terribilem incessu zomby.',
      createdAt: new Date(),
      sender: {
        firstName: 'James',
        lastName: 'Alex',
        photoUrl: 'http://placekitten.com/g/150/150'
      }
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
