import { Component } from '@angular/core';
import { FollowersComponent } from "../../components/followers/followers.component";
import { FollowersContainerComponent } from "../../components/followers-container/followers-container.component";

@Component({
    selector: 'app-followers-page',
    standalone: true,
    templateUrl: './followers-page.component.html',
    styleUrl: './followers-page.component.scss',
    imports: [FollowersComponent, FollowersContainerComponent]
})
export class FollowersPageComponent {

}
