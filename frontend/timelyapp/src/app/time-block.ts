export interface TimeBlock {
    id:number;
    title:string;
    startTime:string;
    endTime:string;
}

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(nullable = false, updatable = false)
//     private long id;
//     private String title;
//     @CreationTimestamp
//     @Column(updatable = false)
//     private Timestamp startTime;
//     private Timestamp endTime;