import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorrentComponent } from './torrent.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TorrentComponent
                // children: [
                //     {
                //         path: '',
                //         component: IndexComponent,
                //     }
                // ]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class TorrentRoutingModule { }
